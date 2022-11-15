import { ArgsType, Field } from "@nestjs/graphql";
import { IsUrl, MaxLength } from "class-validator";

@ArgsType()
export class LinkMetadataArgs {
  @Field()
  @MaxLength(2000)
  @IsUrl()
  linkUrl: string;
}
