import { Embeddable, Embedded, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { Image } from "./image.entity";

@Embeddable()
@ObjectType()
export class LinkMetadata {
  @Property({ nullable: true, columnType: "text" })
  @Field({ nullable: true })
  title?: string;

  @Property({ nullable: true, columnType: "text" })
  @Field({ nullable: true })
  description?: string;

  @Property({ nullable: true })
  @Field({ nullable: true })
  date?: Date;

  @Property({ nullable: true, columnType: "text" })
  @Field({ nullable: true })
  author?: string;

  @Property({ nullable: true, columnType: "text" })
  @Field({ nullable: true })
  publisher?: string;

  @Property({ nullable: true, columnType: "text" })
  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => Image, { nullable: true })
  @Embedded(() => Image, { object: true, nullable: true })
  image?: Image;

  @Property({ nullable: true, columnType: "text" })
  @Field({ nullable: true })
  logoUrl?: string;

  @Field(() => Image, { nullable: true })
  @Embedded(() => Image, { object: true, nullable: true })
  logo?: Image;

  @Property({ nullable: true, columnType: "text" })
  @Field({ nullable: true })
  url?: string;

  @Property({ nullable: true, columnType: "text" })
  @Field({ nullable: true })
  twitterCard?: string;

  @Property({ nullable: true, columnType: "text" })
  @Field({ nullable: true })
  themeColor?: string;
}
