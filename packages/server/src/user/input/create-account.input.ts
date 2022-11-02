import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import { GraphQLEmailAddress } from 'graphql-scalars';

@InputType()
export class CreateAccountInput {
  @Field()
  @Length(3, 20)
  username: string;

  @Field(() => GraphQLEmailAddress, { nullable: true })
  @IsEmail()
  email?: string;

  @Field()
  @Length(6)
  password: string;
}
