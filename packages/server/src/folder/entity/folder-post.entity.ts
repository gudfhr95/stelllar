import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Post } from '../../post/entity/post.entity';
import { Folder } from './folder.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class FolderPost {
  @ManyToOne({ entity: () => Post, primary: true })
  post: Post;

  @ManyToOne({ entity: () => Folder, primary: true })
  folder: Folder;

  @ManyToOne({ entity: () => User, primary: true })
  addedByUser: User;

  [PrimaryKeyType]: [string, string];

  @Property()
  addedAt: Date = new Date();
}
