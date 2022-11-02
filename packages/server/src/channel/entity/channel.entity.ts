import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entity/base.entity';
import { Server } from '../../server/entity/server.entity';
import { ReorderUtils } from '../../common/util/reorder-utils';

@ObjectType({ implements: BaseEntity })
@Entity()
export class Channel extends BaseEntity {
  @Field(() => Server)
  @ManyToOne({ entity: () => Server, inversedBy: 'channels' })
  server: Server;

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION;
}
