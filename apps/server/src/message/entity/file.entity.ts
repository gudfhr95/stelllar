import { Embeddable, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";

@Embeddable()
@ObjectType()
export class File {
  @Property({ columnType: "text" })
  @Field()
  url: string;

  @Property({ columnType: "text" })
  @Field()
  mime: string;

  @Property({ columnType: "text" })
  @Field()
  filename: string;

  @Property()
  @Field()
  size: number;
}
