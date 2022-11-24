import { QueryOrder } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
import { PostImageInput } from "./input/post-image.input";
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

  async getPostById(postId: string) {
    return await this.postRepository.findOneOrFail(
      { id: postId },
      { populate: ["author", "server"] }
    );
  }

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
          { isDeleted: false },
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
    text?: string,
    linkUrl?: string,
    images?: PostImageInput[]
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

    server.postCount += 1;
    await this.serverRepository.persistAndFlush(server);

    const vote = this.postVoteRepository.create({
      post,
      user,
      type: VoteType.Up,
    });
    await this.postVoteRepository.persistAndFlush(vote);

    return post;
  }

  async updatePost(
    postId: string,
    user: User,
    title: string,
    text?: string,
    linkUrl?: string,
    images?: PostImageInput[]
  ) {
    const post = await this.postRepository.findOneOrFail(
      {
        id: postId,
        isDeleted: false,
      },
      { populate: ["author", "server"] }
    );

    if (!(user === post.author || user.isAdmin)) {
      throw new HttpException("forbidden", HttpStatus.FORBIDDEN);
    }

    if (post.linkMetadata) {
      await this.fileService.deleteFileInS3ByUrl(
        post.linkMetadata.image.originalUrl
      );
      await this.fileService.deleteFileInS3ByUrl(
        post.linkMetadata.image.smallUrl
      );
      await this.fileService.deleteFileInS3ByUrl(
        post.linkMetadata.image.popupUrl
      );
    }

    if (post.images && post.images.length > 0) {
      for (const { image } of post.images) {
        await this.fileService.deleteFileInS3ByUrl(image.originalUrl);
        await this.fileService.deleteFileInS3ByUrl(image.smallUrl);
        await this.fileService.deleteFileInS3ByUrl(image.popupUrl);
      }
    }

    if (text) {
      text = handleText(text);

      if (!text) {
        text = null;
      }
    }

    const postImages: PostImage[] = [];
    if (images && images.length > 0) {
      for (const image of images) {
        const { createReadStream, mimetype } = await image.file;
        const ext = mime.getExtension(mimetype);
        if (!imageMimeTypes.includes(mimetype)) {
          throw new Error("Files must be images");
        }

        const i = await this.fileService.uploadImageFile(createReadStream, ext);
        postImages.push({
          image: i,
        });
      }
    }

    post.title = title;
    post.text = text;
    if (linkUrl) {
      post.linkUrl = linkUrl;
      post.linkMetadata = await this.scraperService.scrapeMetadata(linkUrl);
    }
    post.images = postImages;

    await this.postRepository.persistAndFlush(post);

    return post;
  }

  async deletePost(postId: string, user: User) {
    const post = await this.postRepository.findOneOrFail(
      { id: postId, isDeleted: false },
      { populate: ["author", "server"] }
    );

    if (!(post.author === user || user.isAdmin)) {
      throw new HttpException("forbidden", HttpStatus.FORBIDDEN);
    }

    post.isDeleted = true;

    await this.postRepository.persistAndFlush(post);

    return post;
  }

  async vote(postId: string, user: User, type: VoteType) {
    const post = await this.postRepository.findOneOrFail(
      { id: postId },
      { populate: ["author", "server"] }
    );

    let vote = await this.postVoteRepository.findOne({ post, user });
    if (!vote) {
      vote = this.postVoteRepository.create({ post, user });
    }

    if (type === VoteType.Up) {
      post.voteCount += 1;

      if (vote.type === VoteType.Down) {
        post.voteCount += 1;
      }
    } else if (type === VoteType.Down) {
      post.voteCount -= 1;

      if (vote.type === VoteType.Up) {
        post.voteCount -= 1;
      }
    } else if (type === VoteType.None) {
      if (vote.type === VoteType.Up) {
        post.voteCount -= 1;
      } else if (vote.type === VoteType.Down) {
        post.voteCount += 1;
      }
    }

    post.voteType = type;
    await this.postRepository.persistAndFlush(post);

    vote.type = type;
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
