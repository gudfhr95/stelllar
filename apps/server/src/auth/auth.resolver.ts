import { logger } from "@mikro-orm/nestjs";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Response } from "express";
import { GraphQLBoolean } from "graphql/type";
import { User } from "../user/entity/user.entity";
import UserService from "../user/user.service";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorator/current-user.decorator";
import { GqlRes } from "./decorator/gql-res.decorator";
import { GqlJwtAuthGuard } from "./guard/gql-jwt-auth.guard";
import { GqlJwtRefreshGuard } from "./guard/gql-jwt-refresh.guard";
import { GqlLocalAuthGuard } from "./guard/gql-local-auth.guard";
import { ChangePasswordInput } from "./input/change-password.input";
import { LoginInput } from "./input/login.input";
import { RegisterInput } from "./input/register.input";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Mutation(() => User)
  async register(@Args("input") input: RegisterInput) {
    logger.log("register", input);
    return this.authService.register(
      input.email,
      input.nickname,
      input.password
    );
  }

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => User)
  async login(
    @Args("input") input: LoginInput,
    @CurrentUser() user: User,
    @GqlRes() response: Response
  ) {
    logger.log("login", input);
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    response.setHeader("Set-Cookie", [accessTokenCookie, refreshTokenCookie]);

    return user;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => GraphQLBoolean)
  async logout(@CurrentUser() user: User, @GqlRes() response: Response) {
    await this.userService.removeRefreshToken(user.id);
    response.setHeader("Set-Cookie", this.authService.getCookiesForLogOut());

    return true;
  }

  @UseGuards(GqlJwtRefreshGuard)
  @Mutation(() => GraphQLBoolean)
  async refresh(@CurrentUser() user: User, @GqlRes() response: Response) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id
    );

    response.setHeader("Set-Cookie", accessTokenCookie);
    return true;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @Args("input") input: ChangePasswordInput,
    @CurrentUser() user: User
  ) {
    return await this.authService.changePassword(
      user.id,
      input.currentPassword,
      input.newPassword
    );
  }
}
