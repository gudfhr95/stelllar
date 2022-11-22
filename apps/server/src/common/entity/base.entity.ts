import { BigIntType, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryKey({ type: BigIntType })
  id!: string;

  @Field()
  @Property()
  createdAt: Date = new Date();
}
