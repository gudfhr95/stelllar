import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateProfileInput {
  @Field()
  name?: string;
}
