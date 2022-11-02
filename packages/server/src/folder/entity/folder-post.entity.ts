import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Post } from '../../post/entity/post.entity';

@Entity()
export class FolderPost {
  @ManyToOne({ entity: () => Post, primary: true })
  post: Post;

  @Property()
  addedAt: Date = new Date();
}
