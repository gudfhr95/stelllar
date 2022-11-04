import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import { GraphQLEmailAddress } from 'graphql-scalars';

@InputType()
export class RegisterInput {
  @Field(() => GraphQLEmailAddress)
  @IsEmail()
  email: string;

  @Field()
  @Length(3, 20)
  username: string;

  @Field()
  @Length(6)
  password: string;
}
