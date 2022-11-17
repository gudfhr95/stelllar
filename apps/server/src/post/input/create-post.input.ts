import { Field, ID, InputType } from "@nestjs/graphql";
import { ArrayMaxSize, IsUrl, Length, MaxLength } from "class-validator";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";

@InputType()
export class CreatePostInput {
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

  @Field(() => ID)
  serverId: string;

  @Field(() => [CreatePostImagesInput], { nullable: true })
  @ArrayMaxSize(20, { message: "Cannot upload more than 20 images" })
  images?: CreatePostImagesInput[];
}

@InputType()
export class CreatePostImagesInput {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
