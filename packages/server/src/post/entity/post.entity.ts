import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../common/entity/base.entity';
import { Server } from '../../server/entity/server.entity';

@ObjectType({ implements: BaseEntity })
@Entity()
export class Post extends BaseEntity {
  @Field(() => Server)
  @ManyToOne({ entity: () => Server })
  server: Server;
}
