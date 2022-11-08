import { Query, Resolver } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import UserService from "./user.service";
import { GraphQLString } from "graphql/type";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => GraphQLString, { nullable: true })
  test() {
    return "hello";
  }
}
