import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from '../../user/entity/user.entity';
import { Field } from '@nestjs/graphql';

@Entity()
export class GroupUser {
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  @Field()
  @Property()
  lastMessageAt: Date = new Date();
}
