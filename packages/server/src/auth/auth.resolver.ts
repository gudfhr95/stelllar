import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entity/user.entity';
import { RegisterInput } from './input/register.input';
import { AuthService } from './auth.service';
import { LoginInput } from './input/login.input';
import { GqlLocalAuthGuard } from './guard/gql-local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorator/current-user.decorator';
import { Response } from 'express';
import { GqlRes } from './decorator/gql-res.decorator';
import { GqlJwtAuthGuard } from './guard/gql-jwt-auth.guard';
import { GraphQLBoolean } from 'graphql/type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput) {
    return this.authService.register(
      input.email,
      input.username,
      input.password
    );
  }

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => User)
  async login(
    @Args('input') input: LoginInput,
    @CurrentUser() user: User,
    @GqlRes() response: Response
  ) {
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);

    return user;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => GraphQLBoolean)
  async logout(@GqlRes() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return true;
  }
}
