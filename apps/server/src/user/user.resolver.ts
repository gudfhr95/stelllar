import { logger } from "@mikro-orm/nestjs";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLString } from "graphql/type";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { GqlNextAuthSessionGuard } from "../auth/guard/gql-next-auth-session.guard";
import { User } from "./entity/user.entity";
import { UpdateAvatarInput } from "./input/update-avatar.input";
import UserService from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlNextAuthSessionGuard)
  @Mutation(() => User)
  async updateAvatar(
    @Args("input") input: UpdateAvatarInput,
    @CurrentUser() user: User
  ) {
    logger.log("updateAvatar");

    return user;
  }

  @Query(() => GraphQLString, { nullable: true })
  test() {
    return "hello";
  }
}
