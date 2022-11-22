import { QueryOrder } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { VoteType } from "../common/entity/vote-type.enum";
import { handleText } from "../common/util/handle-text";
import { Post } from "../post/entity/post.entity";
import { User } from "../user/entity/user.entity";
import { CommentVote } from "./entity/comment-vote.entity";
import { Comment } from "./entity/comment.entity";
import { CommentsSort } from "./input/comments.args";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    @InjectRepository(CommentVote)
    private readonly commentVoteRepository: EntityRepository<CommentVote>,
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
    const parentComment = parentCommentId
      ? await this.commentRepository.findOneOrFail({ id: parentCommentId })
      : null;

    const comment = await this.commentRepository.create({
      post,
      author: user,
      parentComment,
      text,
      voteCount: 1,
    });
    await this.commentRepository.persistAndFlush(comment);

    const vote = this.commentVoteRepository.create({
      comment,
      user,
      type: VoteType.Up,
    });
    await this.commentVoteRepository.persistAndFlush(vote);

    post.commentCount += 1;
    await this.postRepository.persistAndFlush(post);

    return comment;
  }

  async updateComment(commentId: string, user: User, text: string) {
    const comment = await this.commentRepository.findOneOrFail(
      {
        id: commentId,
        isDeleted: false,
      },
      { populate: ["author"] }
    );

    if (!(user === comment.author || user.isAdmin)) {
      throw new HttpException("forbidden", HttpStatus.FORBIDDEN);
    }

    text = text.replace(/<[^/>][^>]*><\/[^>]+>/, "");
    if (!text) {
      throw new Error("error.comment.empty");
    }
    text = handleText(text);

    comment.text = text;

    await this.commentRepository.persistAndFlush(comment);

    return comment;
  }

  async deleteComment(commentId: string, user: User) {
    const comment = await this.commentRepository.findOneOrFail(
      {
        id: commentId,
        isDeleted: false,
      },
      {
        populate: ["author", "post"],
      }
    );

    if (!(user === comment.author || user.isAdmin)) {
      throw new HttpException("forbidden", HttpStatus.FORBIDDEN);
    }

    comment.isDeleted = true;

    await this.commentRepository.persistAndFlush(comment);

    comment.post.commentCount -= 1;

    await this.postRepository.persistAndFlush(comment.post);

    return comment;
  }

  async vote(commentId: string, user: User, type: VoteType) {
    const comment = await this.commentRepository.findOneOrFail(
      { id: commentId },
      { populate: ["author"] }
    );

    let vote = await this.commentVoteRepository.findOne({ comment, user });
    if (!vote) {
      vote = this.commentVoteRepository.create({ comment, user });
    }

    if (type === VoteType.Up) {
      comment.voteCount += 1;

      if (vote.type === VoteType.Down) {
        comment.voteCount += 1;
      }
    } else if (type === VoteType.Down) {
      comment.voteCount -= 1;

      if (vote.type === VoteType.Up) {
        comment.voteCount -= 1;
      }
    } else if (type === VoteType.None) {
      if (vote.type === VoteType.Up) {
        comment.voteCount -= 1;
      } else if (vote.type === VoteType.Down) {
        comment.voteCount += 1;
      }
    }

    comment.voteType = type;
    await this.commentRepository.persistAndFlush(comment);

    vote.type = type;
    await this.commentVoteRepository.persistAndFlush(vote);

    return comment;
  }

  async getCommentVotesByCommentIdsAndUserId(
    commentIds: string[],
    userId: string
  ) {
    return await this.commentVoteRepository.find({
      comment: commentIds,
      user: userId,
    });
  }
}
