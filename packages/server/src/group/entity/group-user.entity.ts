import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { User } from '../../user/entity/user.entity';
import { Group } from './group.entity';

@Entity()
export class GroupUser {
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  @ManyToOne({ entity: () => Group, primary: true })
  group: Group;

  [PrimaryKeyType]: [string, string];

  @Property()
  lastViewAt: Date = new Date();

  @Property()
  lastMessageAt: Date = new Date();

  @Property({ columnType: 'int' })
  unreadCount = 0;
}
