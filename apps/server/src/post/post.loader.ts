import { Injectable, Scope } from "@nestjs/common";
import DataLoader from "dataloader";
import { VoteType } from "../common/entity/vote-type.enum";
import { PostService } from "./post.service";

@Injectable({ scope: Scope.REQUEST })
export class PostLoader {
  constructor(private readonly postService: PostService) {}

  readonly postVoteLoader = (userId: string) => {
    return new DataLoader<string, VoteType>(async (postIds: string[]) => {
      const postVotes = await this.postService.getPostVotesByPostIdsAndUserId(
        postIds,
        userId
      );

      return postIds.map((postId) => {
        const postVote = postVotes.find((pv) => pv.post.id === postId);

        if (!postVote) {
          return VoteType.None;
        }

        return postVote.type;
      });
    });
  };
}
