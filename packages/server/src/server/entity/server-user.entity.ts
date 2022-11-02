import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field } from '@nestjs/graphql';
import { User } from '../../user/entity/user.entity';
import { ReorderUtils } from '../../common/util/reorder-utils';
import { Role } from './role.entity';

@Entity()
export class ServerUser {
  @Field(() => User)
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION;

  @Field(() => Role)
  @ManyToOne({ entity: () => Role, inversedBy: 'serverUsers' })
  role: Role;
}
