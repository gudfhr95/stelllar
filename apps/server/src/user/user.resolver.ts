import { Logger, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { GqlNextAuthSessionGuard } from "../auth/guard/gql-next-auth-session.guard";
import { User } from "./entity/user.entity";
import { UpdateAvatarInput } from "./input/update-avatar.input";
import { UpdateProfileInput } from "./input/update-profile.input";
import UserService from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlNextAuthSessionGuard)
  @Query(() => User, { nullable: true })
  me(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(GqlNextAuthSessionGuard)
  @Mutation(() => User)
  async updateAvatar(
    @Args("input") input: UpdateAvatarInput,
    @CurrentUser() user: User
  ) {
    Logger.log("updateAvatar");

    return await this.userService.updateAvatar(user, input.avatarFile);
  }

  @UseGuards(GqlNextAuthSessionGuard)
  @Mutation(() => User)
  async updateProfile(
    @Args("input") input: UpdateProfileInput,
    @CurrentUser() user: User
  ) {
    Logger.log("updateProfile");

    return await this.userService.updateProfile(user, input);
  }
}
