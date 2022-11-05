import { registerEnumType } from "@nestjs/graphql";

export enum Color {
  Red = "Red",
  Yellow = "Yellow",
  Green = "Green",
  Blue = "Blue",
  Indigo = "Indigo",
  Purple = "Purple",
  Pink = "Pink",
}

registerEnumType(Color, { name: "Color" });
