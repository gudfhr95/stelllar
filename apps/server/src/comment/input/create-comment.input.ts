import { Field, ID, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";

@InputType()
export class CreateCommentInput {
  @Field()
  @Length(1, 100000, {
    message: "Text must be between 1 and 100000 characters",
  })
  text: string;

  @Field(() => ID)
  postId: string;

  @Field(() => ID, { nullable: true })
  parentCommentId?: string;
}
