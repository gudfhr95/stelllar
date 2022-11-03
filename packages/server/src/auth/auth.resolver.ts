import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entity/user.entity';
import { RegisterInput } from './input/register.input';
import { AuthService } from './auth.service';
import { LoginInput } from './input/login.input';
import { GqlLocalAuthGuard } from './guard/gql-local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorator/current-user.decorator';

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
  async login(@Args('input') input: LoginInput, @CurrentUser() user: User) {
    return user;
  }
}
