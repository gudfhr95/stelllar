import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { fromStream } from "file-type-cjs";
import got from "got-cjs";
import { FileUpload } from "graphql-upload-minimal";
import mime from "mime";
import sharp from "sharp";
import { Readable } from "stream";
import { v4 as uuid } from "uuid";
import { Image } from "../common/entity/image.entity";

export const imageMimeTypes = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const POPUP_MAX_WIDTH = 1440;
const POPUP_MAX_HEIGHT = 630;
const SMALL_MAX_WIDTH = 400;
const SMALL_MAX_HEIGHT = 300;

@Injectable()
export class FileService {
  private readonly s3;
  private readonly initSharp;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      endpoint: `http://${this.configService.get("AWS_ENDPOINT")}`,
      region: this.configService.get("AWS_REGION"),
      accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      s3ForcePathStyle: true,
    });

    this.initSharp = () => sharp({ pages: -1 }).webp({ quality: 80 });
  }

  async uploadSingleFile(
    file: Promise<FileUpload>,
    resize: sharp.ResizeOptions | null = null,
    allowGif = false
  ) {
    const { createReadStream, mimetype } = await file;
    if (!imageMimeTypes.includes(mimetype))
      throw new Error("error.upload.invalidMime");

    let body: Readable = createReadStream();
    const ext = mime.getExtension(mimetype);
    const s = this.initSharp();
    body = body.pipe(s);
    const { pages } = await s.metadata();
    if (resize && (!pages || !allowGif)) {
      s.resize(resize);
    }

    return await this.uploadFileToS3(ext, body, "image/webp");
  }

  async uploadImageUrl(linkUrl: string) {
    const createStream = () => got.stream(linkUrl);

    const fileType = await fromStream(createStream());

    if (!imageMimeTypes.includes(fileType.mime))
      throw new Error("error.upload.invalidMime");

    const ext = fileType.ext;
    return await this.uploadImageFile(createStream, ext);
  }

  async uploadImageFile(createStream: () => any, ext: string) {
    const buffer = await this.streamToBuffer(createStream());
    const originalStream = this.bufferToStream(buffer);

    const originalSharp = this.initSharp();
    const originalBody = originalStream.pipe(originalSharp);
    const metadata = await originalSharp.metadata();
    const pages = metadata.pages;
    const originalWidth = metadata.width;
    let originalHeight = metadata.height;
    if (metadata.pageHeight && pages) originalHeight = metadata.pageHeight;

    const originalUrl = await this.uploadFileToS3(
      ext,
      originalBody,
      "image/webp"
    );

    const image = {
      originalUrl,
      originalWidth,
      originalHeight,
    } as Image;

    if (pages) {
      return {
        ...image,
        smallUrl: originalUrl,
        popupUrl: originalUrl,
      } as Image;
    } else {
      const fit = "inside";

      const smallStream = this.bufferToStream(buffer);
      const smallBody = smallStream.pipe(
        this.initSharp().resize({
          fit,
          width: this.getSmallWidth(image),
          height: this.getSmallHeight(image),
        })
      );

      const popupStream = this.bufferToStream(buffer);
      const popupBody = popupStream.pipe(
        this.initSharp().resize({
          fit,
          width: this.getPopupWidth(image),
          height: this.getPopupHeight(image),
        })
      );

      return {
        ...image,
        smallUrl: await this.uploadFileToS3(ext, smallBody, "image/webp"),
        popupUrl: await this.uploadFileToS3(ext, popupBody, "image/webp"),
      } as Image;
    }
  }

  async uploadFileToS3(
    ext: string,
    body: Readable,
    contentType: string,
    customKey?: string
  ) {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get("AWS_PUBLIC_BUCKET_NAME"),
        Key: customKey ? customKey : `${uuid()}.${ext}`,
        Body: body,
        ContentType: contentType,
        ACL: "public-read",
        CacheControl: "max-age=2592000",
      })
      .promise();

    return `http://${this.configService.get(
      "AWS_ENDPOINT"
    )}/${this.configService.get("AWS_PUBLIC_BUCKET_NAME")}/${uploadResult.Key}`;
  }

  async deleteFileInS3(key: string) {
    await this.s3
      .deleteObject({
        Bucket: this.configService.get("AWS_PUBLIC_BUCKET_NAME"),
        Key: key,
      })
      .promise();
  }

  async streamToBuffer(stream: any) {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream.on("data", (chunk: any) => chunks.push(Buffer.from(chunk)));
      stream.on("error", (err: any) => reject(err));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

  bufferToStream(buffer: any) {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }

  getSmallWidth(image: Image) {
    return this.calculateDimensions({
      width: image.originalWidth,
      height: image.originalHeight,
      maxWidth: SMALL_MAX_WIDTH,
      maxHeight: SMALL_MAX_HEIGHT,
    })[0];
  }

  getSmallHeight(image: Image) {
    return this.calculateDimensions({
      width: image.originalWidth,
      height: image.originalHeight,
      maxWidth: SMALL_MAX_WIDTH,
      maxHeight: SMALL_MAX_HEIGHT,
    })[1];
  }

  getPopupWidth(image: Image) {
    return this.calculateDimensions({
      width: image.originalWidth,
      height: image.originalHeight,
      maxWidth: POPUP_MAX_WIDTH,
      maxHeight: POPUP_MAX_HEIGHT,
    })[0];
  }

  getPopupHeight(image: Image) {
    return this.calculateDimensions({
      width: image.originalWidth,
      height: image.originalHeight,
      maxWidth: POPUP_MAX_WIDTH,
      maxHeight: POPUP_MAX_HEIGHT,
    })[1];
  }

  calculateDimensions({ width, height, maxWidth, maxHeight }) {
    if (width > maxWidth) {
      const ratio = height / width;
      width = maxWidth;
      height = Math.round(width * ratio);
    }

    if (height > maxHeight) {
      const ratio = width / height;
      height = maxHeight;
      width = Math.round(height * ratio);
    }

    return [width, height];
  }
}
