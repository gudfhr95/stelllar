import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class ChangePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  @MinLength(6)
  newPassword: string;
}
