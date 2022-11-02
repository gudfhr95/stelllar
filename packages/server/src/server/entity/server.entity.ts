import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entity/base.entity';
import { Entity } from '@mikro-orm/core';

@ObjectType({ implements: BaseEntity })
@Entity()
export class Server extends BaseEntity {}
