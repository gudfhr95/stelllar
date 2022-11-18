import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { FileModule } from "../file/file.module";
import { ScraperModule } from "../scraper/scraper.module";
import { ServerUser } from "../server/entity/server-user.entity";
import { Server } from "../server/entity/server.entity";
import { PostVote } from "./entity/post-vote.entity";
import { Post } from "./entity/post.entity";
import { PostLoader } from "./post.loader";
import { PostResolver } from "./post.resolver";
import { PostService } from "./post.service";

@Module({
  imports: [
    MikroOrmModule.forFeature([Post, PostVote, Server, ServerUser]),
    FileModule,
    ScraperModule,
  ],
  providers: [PostResolver, PostService, PostLoader],
})
export class PostModule {}
