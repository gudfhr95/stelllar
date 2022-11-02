import { Entity, ManyToOne } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entity/base.entity';
import { Post } from '../../post/entity/post.entity';

@ObjectType({ implements: BaseEntity })
@Entity()
export class Comment extends BaseEntity {
  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post;
}
