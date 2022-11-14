import { Field, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";
import { ServerCategory } from "../entity/server-category.enum";

@InputType()
export class UpdateServerInput {
  @Field()
  serverId: string;

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
