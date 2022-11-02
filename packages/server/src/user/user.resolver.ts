import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { CreateAccountInput } from './input/create-account.input';
import UserService from './user.service';
import { Logger } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => User)
  async createAccount(@Args('input') input: CreateAccountInput) {
    const createdUser = await this.userService.createAccount(
      input.username,
      input.email,
      input.password
    );

    Logger.log(createdUser);

    return createdUser;
  }
}
