import { Logger } from "@nestjs/common";
import { Args, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { GraphQLBoolean } from "graphql/type";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { Server } from "../server/entity/server.entity";
import { User } from "./entity/user.entity";
import { UpdateAvatarInput } from "./input/update-avatar.input";
import { UpdateProfileInput } from "./input/update-profile.input";
import { UserLoader } from "./user.loader";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userLoader: UserLoader
  ) {}

  @Query(() => User, { nullable: true })
  me(@CurrentUser() user: User) {
    Logger.log("me");
    return user;
  }

  @Mutation(() => User)
  async updateAvatar(
    @Args("input") input: UpdateAvatarInput,
    @CurrentUser() user: User
  ) {
    Logger.log("updateAvatar");

    return await this.userService.updateAvatar(user, input.avatarFile);
  }

  @Mutation(() => User)
  async updateProfile(
    @Args("input") input: UpdateProfileInput,
    @CurrentUser() user: User
  ) {
    Logger.log("updateProfile");

    return await this.userService.updateProfile(user, input);
  }

  @Mutation(() => GraphQLBoolean)
  async deleteUser(@CurrentUser() user: User) {
    Logger.log("deleteUser");

    return await this.userService.deleteUser(user);
  }

  @ResolveField("servers", () => [Server])
  async servers(@CurrentUser() user: User) {
    return this.userLoader.userServersLoader(user.id).load(user.id);
  }
}
