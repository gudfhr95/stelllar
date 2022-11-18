import { Field, ID, InputType } from "@nestjs/graphql";
import { VoteType } from "../../common/entity/vote-type.enum";

@InputType()
export class CommentVoteInput {
  @Field(() => ID)
  commentId: string;

  @Field(() => VoteType)
  type: VoteType;
}
