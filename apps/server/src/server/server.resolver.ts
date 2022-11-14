import { Logger, UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { GraphQLBoolean } from "graphql/type";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { Public } from "../auth/decorator/public.decorator";
import { GqlNextAuthSessionGuard } from "../auth/guard/gql-next-auth-session.guard";
import { User } from "../user/entity/user.entity";
import { Server } from "./entity/server.entity";
import { CreateServerInput } from "./input/create-server.input";
import { ServerLoader } from "./server.loader";
import { ServerService } from "./server.service";

@Resolver(() => Server)
export class ServerResolver {
  constructor(
    private readonly serverService: ServerService,
    private readonly serverLoader: ServerLoader
  ) {}

  @Public()
  @Query(() => Server, { nullable: true })
  async server(@Args("name") name: string, @CurrentUser() user?: User) {
    Logger.log("server");

    return await this.serverService.getServerByName(name);
  }

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

  @Public()
  @ResolveField("isJoined", () => GraphQLBoolean)
  async isJoined(@Parent() server: Server, @CurrentUser() user?: User) {
    Logger.log("isJoined");

    return this.serverLoader.serverJoinedLoader(user?.id).load(server.id);
  }
}
