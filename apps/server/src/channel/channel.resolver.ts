import { Logger } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { User } from "../user/entity/user.entity";
import { ChannelService } from "./channel.service";
import { Channel } from "./entity/channel.entity";
import { CreateChannelInput } from "./input/create-channel.input";

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(() => Channel)
  async createChannel(
    @Args("input") input: CreateChannelInput,
    @CurrentUser() user: User
  ) {
    Logger.log("createChannel");

    return await this.channelService.createChannel(
      input.serverId,
      user,
      input.name,
      input.description
    );
  }
}
