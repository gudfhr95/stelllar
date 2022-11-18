import { Injectable, Scope } from "@nestjs/common";
import DataLoader from "dataloader";
import { VoteType } from "../common/entity/vote-type.enum";
import { CommentService } from "./comment.service";

@Injectable({ scope: Scope.REQUEST })
export class CommentLoader {
  constructor(private readonly commentService: CommentService) {}

  readonly commentVoteLoader = (userId: string) => {
    return new DataLoader<string, VoteType>(async (commentIds: string[]) => {
      const commentVotes =
        await this.commentService.getCommentVotesByCommentIdsAndUserId(
          commentIds,
          userId
        );

      return commentIds.map((commentId) => {
        const commentVote = commentVotes.find(
          (cv) => cv.comment.id === commentId
        );

        if (!commentVote) {
          return VoteType.None;
        }

        return commentVote.type;
      });
    });
  };
}
