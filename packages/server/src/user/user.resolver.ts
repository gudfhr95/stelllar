import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import UserService from './user.service';
import { UserArgs } from './input/user.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async getUser(@Args() args: UserArgs) {}
}
