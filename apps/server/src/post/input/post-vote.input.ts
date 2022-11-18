import { Field, ID, InputType } from "@nestjs/graphql";
import { VoteType } from "../../common/entity/vote-type.enum";

@InputType()
export class PostVoteInput {
  @Field(() => ID)
  postId: string;

  @Field(() => VoteType)
  type: VoteType;
}
