import { BaseEntity } from '../../common/entity/base.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class User extends BaseEntity {
  @Property({ columnType: 'text' })
  username: string;
}
