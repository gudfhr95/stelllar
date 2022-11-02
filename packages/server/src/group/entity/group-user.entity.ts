import { Entity, ManyToOne } from '@mikro-orm/core';
import { User } from '../../user/entity/user.entity';

@Entity()
export class GroupUser {
  @ManyToOne({ entity: () => User, primary: true })
  user: User;
}
