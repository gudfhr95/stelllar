import { Logger } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { GraphQLBoolean } from "graphql/type";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { Public } from "../auth/decorator/public.decorator";
import { VoteType } from "../common/entity/vote-type.enum";
import { User } from "../user/entity/user.entity";
import { CommentLoader } from "./comment.loader";
import { CommentService } from "./comment.service";
import { Comment } from "./entity/comment.entity";
import { CommentVoteInput } from "./input/comment-vote.input";
import { CommentsArgs } from "./input/comments.args";
import { CreateCommentInput } from "./input/create-comment.input";
import { UpdateCommentInput } from "./input/update-comment.input";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentLoader: CommentLoader
  ) {}

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

  @Mutation(() => Comment)
  async updateComment(
    @Args("input") input: UpdateCommentInput,
    @CurrentUser() user: User
  ) {
    Logger.log("updateComment");

    return await this.commentService.updateComment(
      input.commentId,
      user,
      input.text
    );
  }

  @Mutation(() => GraphQLBoolean)
  async deleteComment(
    @Args("id") commentId: string,
    @CurrentUser() user: User
  ) {
    Logger.log("deleteComment");

    return !!(await this.commentService.deleteComment(commentId, user));
  }

  @Mutation(() => Comment)
  async commentVote(
    @Args("input") input: CommentVoteInput,
    @CurrentUser() user: User
  ) {
    return await this.commentService.vote(input.commentId, user, input.type);
  }

  @ResolveField("voteType", () => VoteType)
  voteType(@Parent() comment: Comment, @CurrentUser() user: User) {
    if (!user) {
      return VoteType.None;
    }

    return this.commentLoader.commentVoteLoader(user.id).load(comment.id);
  }
}
