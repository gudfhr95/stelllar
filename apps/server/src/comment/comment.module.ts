import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Post } from "../post/entity/post.entity";
import { CommentResolver } from "./comment.resolver";
import { CommentService } from "./comment.service";
import { Comment } from "./entity/comment.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Comment, Post])],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
