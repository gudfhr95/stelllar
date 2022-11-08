import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";
import { GraphQLEmailAddress } from "graphql-scalars";

@InputType()
export class RegisterInput {
  @Field(() => GraphQLEmailAddress)
  @IsEmail()
  email: string;

  @Field()
  @Length(2, 16)
  nickname: string;

  @Field()
  @Length(8)
  password: string;
}
