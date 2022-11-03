import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { CreateAccountInput } from './input/create-account.input';
import UserService from './user.service';
import { LoginResponse } from './response/login.response';
import { UserArgs } from './input/user.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async getUser(@Args() args: UserArgs) {}

  @Mutation(() => LoginResponse)
  async createAccount(@Args('input') input: CreateAccountInput) {}
}
