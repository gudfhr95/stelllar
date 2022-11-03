import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UserArgs {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  username: string;
}
