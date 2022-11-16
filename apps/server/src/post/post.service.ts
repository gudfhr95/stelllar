import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import mime from "mime";
import { handleText } from "../common/util/handle-text";
import { FileService, imageMimeTypes } from "../file/file.service";
import { ScraperService } from "../scraper/scraper.service";
import { Server } from "../server/entity/server.entity";
import { User } from "../user/entity/user.entity";
import { PostImage } from "./entity/post-image.entity";
import { Post } from "./entity/post.entity";
import { CreatePostImagesInput } from "./input/create-post.input";

@Injectable()
export class PostService {
  constructor(
    private readonly fileService: FileService,
    private readonly scraperService: ScraperService,
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    @InjectRepository(Server)
    private readonly serverRepository: EntityRepository<Server>
  ) {}

  async createPost(
    user: User,
    serverId: string,
    title: string,
    linkUrl?: string,
    text?: string,
    images?: CreatePostImagesInput[]
  ) {
    if (text) {
      text = handleText(text);

      if (!text) {
        text = null;
      }
    }

    const server = await this.serverRepository.findOneOrFail({ id: serverId });

    const postImages: PostImage[] = [];
    if (images && images.length > 0) {
      for (const image of images) {
        const { createReadStream, mimetype } = await image.file;
        const ext = mime.getExtension(mimetype);
        if (!imageMimeTypes.includes(mimetype)) {
          throw new Error("Files must be images");
        }

        const i = await this.fileService.uploadImageFile(createReadStream, ext);
        console.log(i);
        postImages.push({
          image: i,
        });
      }
    }

    const post = this.postRepository.create({
      server,
      author: user,
      title,
      text,
      linkUrl,
      linkMetadata: linkUrl
        ? await this.scraperService.scrapeMetadata(linkUrl)
        : null,
      images: postImages,
    });

    await this.postRepository.persistAndFlush(post);
    return post;
  }
}
