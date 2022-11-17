import { Logger } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { Public } from "../auth/decorator/public.decorator";
import { User } from "../user/entity/user.entity";
import { Post } from "./entity/post.entity";
import { CreatePostInput } from "./input/create-post.input";
import { PostsArgs } from "./input/posts.args";
import { PostService } from "./post.service";

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Query(() => [Post])
  async posts(@Args() args: PostsArgs, @CurrentUser() user: User) {
    Logger.log("posts");

    return await this.postService.getPosts(
      user,
      args.serverName,
      args.feed,
      args.sort,
      args.time,
      args.offset,
      args.limit
    );
  }

  @Mutation(() => Post)
  async createPost(
    @Args("input") input: CreatePostInput,
    @CurrentUser() user: User
  ) {
    Logger.log("createPost");

    return await this.postService.createPost(
      user,
      input.serverId,
      input.title,
      input.linkUrl,
      input.text,
      input.images
    );
  }

  @ResolveField("thumbnailUrl", () => GraphQLString, { nullable: true })
  thumbnailUrl(@Parent() post: Post) {
    if (post.images && post.images.length > 0) {
      return post.images[0].image.smallUrl;
    }

    if (!post.linkUrl) {
      return null;
    }

    if (post.linkMetadata && post.linkMetadata.image) {
      return post.linkMetadata.image.smallUrl;
    }

    if (post.linkMetadata && post.linkMetadata.logo) {
      return post.linkMetadata.logo.smallUrl;
    }

    return null;
  }
}
