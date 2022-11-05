import { Query, Resolver } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import UserService from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async getUser() {}
}
