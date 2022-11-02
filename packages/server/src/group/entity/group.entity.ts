import { Collection, Entity, ManyToMany, QueryOrder } from '@mikro-orm/core';
import { BaseEntity } from '../../common/entity/base.entity';
import { User } from '../../user/entity/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ implements: BaseEntity })
@Entity()
export class Group extends BaseEntity {
  @Field(() => [User])
  @ManyToMany(() => User, 'groups', {
    owner: true,
    orderBy: { username: QueryOrder.ASC },
  })
  users = new Collection<User>(this);
}
