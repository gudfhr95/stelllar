import { Field, ID, InputType } from "@nestjs/graphql";
import { Matches, MaxLength } from "class-validator";

const CHANNEL_REGEX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

@InputType()
export class UpdateChannelInput {
  @Field(() => ID)
  channelId: string;

  @Field()
  @MaxLength(100)
  @Matches(CHANNEL_REGEX)
  name?: string;

  @Field({ nullable: true })
  @MaxLength(500)
  description?: string;
}
