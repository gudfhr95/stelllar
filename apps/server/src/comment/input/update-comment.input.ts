import { Field, ID, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";

@InputType()
export class UpdateCommentInput {
  @Field(() => ID)
  commentId: string;

  @Field()
  @Length(1, 100000, {
    message: "Text must be between 1 and 100000 characters",
  })
  text: string;
}
