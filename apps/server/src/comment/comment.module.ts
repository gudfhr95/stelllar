import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Post } from "../post/entity/post.entity";
import { CommentLoader } from "./comment.loader";
import { CommentResolver } from "./comment.resolver";
import { CommentService } from "./comment.service";
import { CommentVote } from "./entity/comment-vote.entity";
import { Comment } from "./entity/comment.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Comment, CommentVote, Post])],
  providers: [CommentResolver, CommentService, CommentLoader],
})
export class CommentModule {}
