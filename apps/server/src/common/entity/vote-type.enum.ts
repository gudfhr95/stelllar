import { registerEnumType } from "@nestjs/graphql";

export enum VoteType {
  Up = "Up",
  None = "None",
  Down = "Down",
}

registerEnumType(VoteType, { name: "VoteType" });
