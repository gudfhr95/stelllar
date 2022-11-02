import { Entity, ManyToOne } from '@mikro-orm/core';
import { Post } from './post.entity';

@Entity()
export class PostVote {
  @ManyToOne({ entity: () => Post, primary: true })
  post: Post;
}
