import { QueryOrder } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { handleText } from "../common/util/handle-text";
import { Post } from "../post/entity/post.entity";
import { User } from "../user/entity/user.entity";
import { Comment } from "./entity/comment.entity";
import { CommentsSort } from "./input/comments.args";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>
  ) {}

  async getCommentsByPostId(postId: string, sort: CommentsSort) {
    const post = await this.postRepository.findOneOrFail({ id: postId });

    return await this.commentRepository.find(
      { post },
      {
        orderBy:
          sort === CommentsSort.Top
            ? { voteCount: QueryOrder.DESC, createdAt: QueryOrder.DESC }
            : { createdAt: QueryOrder.DESC },
        populate: ["author"],
      }
    );
  }

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
