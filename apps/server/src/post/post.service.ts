import { QueryOrder } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import mime from "mime";
import { VoteType } from "../common/entity/vote-type.enum";
import { handleText } from "../common/util/handle-text";
import { FileService, imageMimeTypes } from "../file/file.service";
import { ScraperService } from "../scraper/scraper.service";
import { ServerUserStatus } from "../server/entity/server-user-status.enum";
import { ServerUser } from "../server/entity/server-user.entity";
import { Server } from "../server/entity/server.entity";
import { User } from "../user/entity/user.entity";
import { PostImage } from "./entity/post-image.entity";
import { PostVote } from "./entity/post-vote.entity";
import { Post } from "./entity/post.entity";
import { CreatePostImagesInput } from "./input/create-post.input";
import { PostsFeed, PostsSort, PostsTime } from "./input/posts.args";

@Injectable()
export class PostService {
  constructor(
    private readonly fileService: FileService,
    private readonly scraperService: ScraperService,
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    @InjectRepository(PostVote)
    private readonly postVoteRepository: EntityRepository<PostVote>,
    @InjectRepository(Server)
    private readonly serverRepository: EntityRepository<Server>,
    @InjectRepository(ServerUser)
    private readonly serverUserRepository: EntityRepository<ServerUser>
  ) {}

  async getPosts(
    user: User,
    serverName: string,
    feed: PostsFeed,
    sort: PostsSort,
    time: PostsTime,
    offset: number,
    limit: number
  ) {
    let orderBy = {};
    if (sort === PostsSort.New) {
      orderBy = { createdAt: QueryOrder.DESC };
    } else if (sort === PostsSort.Hot) {
      orderBy = { hotRank: QueryOrder.DESC };
    } else if (sort === PostsSort.Top) {
      orderBy = { voteCount: QueryOrder.DESC };
    }

    let servers: Server[] = [];
    if (serverName) {
      servers = [
        await this.serverRepository.findOneOrFail({ name: serverName }),
      ];
    } else if (feed === PostsFeed.Joined) {
      const joinedServers = await this.serverUserRepository.find(
        {
          user,
          status: ServerUserStatus.Joined,
        },
        { populate: ["server"] }
      );

      servers = joinedServers.map((js) => js.server);
    } else if (feed === PostsFeed.Featured) {
      servers = await this.serverRepository.findAll();
    }

    return await this.postRepository.find(
      {
        $and: [
          !time || time === PostsTime.All
            ? {}
            : {
                createdAt: {
                  $gt: dayjs()
                    .subtract(1, time.toLowerCase() as any)
                    .toDate(),
                },
              },
          servers.length ? { server: servers } : { server: [] },
        ],
      },
      {
        orderBy,
        limit,
        offset,
        populate: ["author", "server"],
      }
    );
  }

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
      voteCount: 1,
    });

    await this.postRepository.persistAndFlush(post);

    const vote = this.postVoteRepository.create({
      post,
      user,
      type: VoteType.Up,
    });

    await this.postVoteRepository.persistAndFlush(vote);

    return post;
  }

  async getPostVotesByPostIdsAndUserId(postIds: string[], userId: string) {
    return await this.postVoteRepository.find({
      post: postIds,
      user: userId,
    });
  }
}
