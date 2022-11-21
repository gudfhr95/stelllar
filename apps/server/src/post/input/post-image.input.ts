import { Field, InputType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload-minimal";

@InputType()
export class PostImageInput {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
