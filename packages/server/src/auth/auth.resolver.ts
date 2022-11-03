import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entity/user.entity';
import { RegisterInput } from './input/register.input';
import { AuthService } from './auth.service';

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

  @Mutation(() => User)
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }
}
