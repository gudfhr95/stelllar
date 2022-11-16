import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { FileModule } from "../file/file.module";
import { ScraperModule } from "../scraper/scraper.module";
import { Server } from "../server/entity/server.entity";
import { Post } from "./entity/post.entity";
import { PostResolver } from "./post.resolver";
import { PostService } from "./post.service";

@Module({
  imports: [
    MikroOrmModule.forFeature([Post, Server]),
    FileModule,
    ScraperModule,
  ],
  providers: [PostResolver, PostService],
})
export class PostModule {}
