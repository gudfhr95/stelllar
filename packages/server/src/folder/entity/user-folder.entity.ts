import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { User } from '../../user/entity/user.entity';
import { ReorderUtils } from '../../common/util/reorder-utils';
import { Folder } from './folder.entity';

@Entity()
export class UserFolder {
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  @ManyToOne({ entity: () => Folder, primary: true })
  folder: Folder;

  [PrimaryKeyType]: [string, string];

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION;
}
