import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entity/base.entity';
import { Collection, Entity, OneToMany, QueryOrder } from '@mikro-orm/core';
import { Role } from './role.entity';

@ObjectType({ implements: BaseEntity })
@Entity()
export class Server extends BaseEntity {
  @Field(() => [Role])
  @OneToMany(() => Role, 'server', {
    orderBy: { createdAt: QueryOrder.DESC },
  })
  roles = new Collection<Role>(this);
}
