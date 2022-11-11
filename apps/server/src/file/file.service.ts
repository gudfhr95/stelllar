import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { FileUpload } from "graphql-upload-minimal";
import * as mime from "mime";
import * as sharp from "sharp";
import { Readable } from "stream";
import { v4 as uuid } from "uuid";

export const imageMimeTypes = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
];

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
}
