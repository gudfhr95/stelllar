import { Logger } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { GraphQLBoolean, GraphQLString } from "graphql/type";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { Public } from "../auth/decorator/public.decorator";
import { VoteType } from "../common/entity/vote-type.enum";
import { User } from "../user/entity/user.entity";
import { PostVote } from "./entity/post-vote.entity";
import { Post } from "./entity/post.entity";
import { CreatePostInput } from "./input/create-post.input";
import { PostVoteInput } from "./input/post-vote.input";
import { PostsArgs, PostsFeed } from "./input/posts.args";
import { UpdatePostInput } from "./input/update-post.input";
import { PostLoader } from "./post.loader";
import { PostService } from "./post.service";

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly postLoader: PostLoader
  ) {}

  @Public()
  @Query(() => Post)
  async post(@Args("id") postId: string, @CurrentUser() user: User) {
    Logger.log("post");

    return await this.postService.getPostById(postId);
  }

  @Public()
  @Query(() => [Post])
  async posts(@Args() args: PostsArgs, @CurrentUser() user: User) {
    Logger.log("posts");

    if (!user) {
      args.feed = PostsFeed.Featured;
    }

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
      input.text,
      input.linkUrl,
      input.images
    );
  }

  @Mutation(() => Post)
  async updatePost(
    @Args("input") input: UpdatePostInput,
    @CurrentUser() user: User
  ) {
    Logger.log("updatePost");

    return await this.postService.updatePost(
      input.postId,
      user,
      input.title,
      input.text,
      input.linkUrl,
      input.images
    );
  }

  @Mutation(() => GraphQLBoolean)
  async deletePost(@Args("id") postId: string, @CurrentUser() user: User) {
    Logger.log("deletePost");

    return !!(await this.postService.deletePost(postId, user));
  }

  @Mutation(() => Post)
  async postVote(
    @Args("input") input: PostVoteInput,
    @CurrentUser() user: User
  ) {
    return await this.postService.vote(input.postId, user, input.type);
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

  @ResolveField("voteType", () => PostVote)
  voteType(@Parent() post: Post, @CurrentUser() user: User) {
    if (!user) {
      return VoteType.None;
    }

    return this.postLoader.postVoteLoader(user.id).load(post.id);
  }
}
