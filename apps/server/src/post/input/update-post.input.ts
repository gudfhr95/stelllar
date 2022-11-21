import { Field, ID, InputType } from "@nestjs/graphql";
import { ArrayMaxSize, IsUrl, Length, MaxLength } from "class-validator";
import { PostImageInput } from "./post-image.input";

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  postId: string;

  @Field()
  @Length(1, 300, { message: "Title must be no longer than 300 characters." })
  title: string;

  @Field({ nullable: true })
  @MaxLength(2000, { message: "URL must be no longer than 2000 characters." })
  @IsUrl()
  linkUrl?: string;

  @Field({ nullable: true })
  @MaxLength(100000, {
    message: "Text max length is 100000 characters",
  })
  text?: string;

  @Field(() => [PostImageInput], { nullable: true })
  @ArrayMaxSize(20, { message: "Cannot upload more than 20 images" })
  images?: PostImageInput[];
}
