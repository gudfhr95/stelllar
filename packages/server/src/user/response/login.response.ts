import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { GraphQLJWT } from 'graphql-scalars';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field(() => GraphQLJWT)
  accessToken: string;
}
