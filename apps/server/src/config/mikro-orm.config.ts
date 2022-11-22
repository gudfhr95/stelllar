import { Options } from "@mikro-orm/core";
import { ConfigService } from "@nestjs/config";
import { Comment } from "../comment/entity/comment.entity";
import { Post } from "../post/entity/post.entity";
import { Server } from "../server/entity/server.entity";
import { User } from "../user/entity/user.entity";

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  entities: [User, Server, Post, Comment],
  type: "postgresql",
  host: configService.get("POSTGRES_HOST"),
  port: configService.get("POSTGRES_PORT"),
  user: configService.get("POSTGRES_USER"),
  password: configService.get("POSTGRES_PASSWORD"),
  dbName: configService.get("POSTGRES_DB"),
};

export default MikroOrmConfig;
