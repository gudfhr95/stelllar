import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from '../../user/entity/user.entity';
import { ReorderUtils } from '../../common/util/reorder-utils';

@Entity()
export class UserFolder {
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION;
}
