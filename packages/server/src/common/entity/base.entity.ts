import { BigIntType, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey({ type: BigIntType })
  id!: string;

  @Property()
  createdAt: Date = new Date();
}
