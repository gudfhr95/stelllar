import { Entity, ManyToOne } from '@mikro-orm/core';
import { Comment } from './comment.entity';

@Entity()
export class CommentVote {
  @ManyToOne({ entity: () => Comment, primary: true })
  comment: Comment;
}
