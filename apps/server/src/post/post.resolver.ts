import { Logger } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
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
}
