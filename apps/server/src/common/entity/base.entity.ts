import { PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, InterfaceType } from "@nestjs/graphql";
import { v4 as uuid } from "uuid";

@InterfaceType()
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = uuid();

  @Field()
  @Property()
  createdAt: Date = new Date();
}
