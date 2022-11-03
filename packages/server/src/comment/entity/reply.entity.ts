import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/entity/base.entity';
import { User } from '../../user/entity/user.entity';
import { Comment } from './comment.entity';

@ObjectType({ implements: BaseEntity })
@Entity()
export class Reply extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Field(() => Comment)
  @ManyToOne(() => Comment)
  comment: Comment;

  @Field()
  @Property({ columnType: 'boolean' })
  isRead = false;
}
