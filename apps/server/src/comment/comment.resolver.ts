import { Logger } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { Public } from "../auth/decorator/public.decorator";
import { VoteType } from "../common/entity/vote-type.enum";
import { User } from "../user/entity/user.entity";
import { CommentService } from "./comment.service";
import { Comment } from "./entity/comment.entity";
import { CommentsArgs } from "./input/comments.args";
import { CreateCommentInput } from "./input/create-comment.input";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Query(() => [Comment])
  async comments(@Args() args: CommentsArgs, @CurrentUser() user: User) {
    Logger.log("comments");

    return await this.commentService.getCommentsByPostId(
      args.postId,
      args.sort
    );
  }

  @Mutation(() => Comment)
  async createComment(
    @Args("input") input: CreateCommentInput,
    @CurrentUser() user: User
  ) {
    Logger.log("createComment");

    return await this.commentService.createComment(
      input.postId,
      input.parentCommentId,
      user,
      input.text
    );
  }

  @ResolveField("voteType", () => VoteType)
  voteType(@Parent() comment: Comment, @CurrentUser() user: User) {
    return VoteType.None;
  }
}
