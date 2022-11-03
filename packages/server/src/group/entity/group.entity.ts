import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  QueryOrder,
} from '@mikro-orm/core';
import { BaseEntity } from '../../common/entity/base.entity';
import { User } from '../../user/entity/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from '../../message/entity/message.entity';

@ObjectType({ implements: BaseEntity })
@Entity()
export class Group extends BaseEntity {
  @Field(() => [User])
  @ManyToMany(() => User, 'groups', {
    owner: true,
    orderBy: { username: QueryOrder.ASC },
  })
  users = new Collection<User>(this);

  @OneToMany(() => Message, 'group')
  messages = new Collection<Message>(this);
}
