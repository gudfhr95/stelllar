import { Field, InputType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";

@InputType()
export class UpdateAvatarInput {
  @Field(() => GraphQLUpload)
  avatarFile?: Promise<FileUpload>;
}
