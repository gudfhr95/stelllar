import { Field, InputType } from "@nestjs/graphql";
import { Length, Matches } from "class-validator";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";
import { ServerCategory } from "../entity/server-category.enum";

const SERVER_REGEX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

@InputType()
export class CreateServerInput {
  @Field()
  @Length(2, 20)
  @Matches(SERVER_REGEX, { message: "Letters, numbers and underscores only" })
  name: string;

  @Field()
  @Length(2, 100)
  displayName: string;

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string;

  @Field(() => ServerCategory, { defaultValue: ServerCategory.Other })
  category: ServerCategory = ServerCategory.Other;

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: Promise<FileUpload>;

  @Field(() => GraphQLUpload, { nullable: true })
  bannerFile?: Promise<FileUpload>;
}
