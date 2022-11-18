import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { handleText } from "../common/util/handle-text";
import { Post } from "../post/entity/post.entity";
import { User } from "../user/entity/user.entity";
import { Comment } from "./entity/comment.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>
  ) {}

  async createComment(
    postId: string,
    parentCommentId: string,
    user: User,
    text: string
  ) {
    text = text.replace(/<[^/>][^>]*><\/[^>]+>/, "");
    if (!text) {
      throw new Error("error.comment.empty");
    }
    text = handleText(text);

    const post = await this.postRepository.findOneOrFail({ id: postId });

    const comment = await this.commentRepository.create({
      post,
      author: user,
      text,
      voteCount: 1,
    });
    await this.commentRepository.persistAndFlush(comment);

    post.commentCount += 1;
    await this.postRepository.persistAndFlush(post);

    return comment;
  }
}
