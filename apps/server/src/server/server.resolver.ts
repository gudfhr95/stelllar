import { Logger, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { GqlNextAuthSessionGuard } from "../auth/guard/gql-next-auth-session.guard";
import { User } from "../user/entity/user.entity";
import { Server } from "./entity/server.entity";
import { CreateServerInput } from "./input/create-server.input";
import { ServerService } from "./server.service";

@Resolver(() => Server)
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @UseGuards(GqlNextAuthSessionGuard)
  @Mutation(() => Server)
  async createServer(
    @Args("input") input: CreateServerInput,
    @CurrentUser() user: User
  ) {
    Logger.log("createServer");

    return await this.serverService.createServer(
      user,
      input.name,
      input.displayName,
      input.description,
      input.category,
      input.avatarFile,
      input.bannerFile
    );
  }
}
