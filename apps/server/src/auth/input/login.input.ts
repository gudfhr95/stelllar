import { Field, InputType } from "@nestjs/graphql";
import { GraphQLEmailAddress } from "graphql-scalars";

@InputType()
export class LoginInput {
  @Field(() => GraphQLEmailAddress)
  email: string;

  @Field()
  password: string;
}
