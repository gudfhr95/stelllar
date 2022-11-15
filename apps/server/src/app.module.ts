import * as Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ChannelModule } from "./channel/channel.module";
import { CommentModule } from "./comment/comment.module";
import { DatabaseModule } from "./database/database.module";
import { FileModule } from "./file/file.module";
import { FolderModule } from "./folder/folder.module";
import { GraphqlModule } from "./graphql/graphql.module";
import { GroupModule } from "./group/group.module";
import { MessageModule } from "./message/message.module";
import { PostModule } from "./post/post.module";
import { ServerModule } from "./server/server.module";
import { UserModule } from "./user/user.module";
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        AWS_ENDPOINT: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    GraphqlModule,
    UserModule,
    ServerModule,
    FolderModule,
    GroupModule,
    PostModule,
    ChannelModule,
    CommentModule,
    MessageModule,
    AuthModule,
    FileModule,
    ScraperModule,
  ],
})
export class AppModule {}
