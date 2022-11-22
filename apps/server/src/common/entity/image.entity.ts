import { Embeddable, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLPositiveInt } from "graphql-scalars";

@Embeddable()
@ObjectType()
export class Image {
  @Property({ columnType: "text" })
  @Field()
  originalUrl: string;

  @Property()
  @Field(() => GraphQLPositiveInt)
  originalWidth: number;

  @Property()
  @Field(() => GraphQLPositiveInt)
  originalHeight: number;

  @Property({ columnType: "text", nullable: true })
  @Field({ nullable: true })
  smallUrl?: string;

  @Field(() => GraphQLPositiveInt, { nullable: true })
  smallWidth: number;

  @Field(() => GraphQLPositiveInt, { nullable: true })
  smallHeight: number;

  @Property({ columnType: "text", nullable: true })
  @Field({ nullable: true })
  popupUrl: string;

  @Field(() => GraphQLPositiveInt, { nullable: true })
  popupWidth: number;

  @Field(() => GraphQLPositiveInt, { nullable: true })
  popupHeight: number;
}
