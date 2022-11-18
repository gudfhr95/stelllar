import { Logger } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { User } from "../user/entity/user.entity";
import { CommentService } from "./comment.service";
import { Comment } from "./entity/comment.entity";
import { CreateCommentInput } from "./input/create-comment.input";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

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
}
