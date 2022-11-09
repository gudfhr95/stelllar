import * as Joi from "@hapi/joi";
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "./auth/auth.module";
import { ChannelModule } from "./channel/channel.module";
import { CommentModule } from "./comment/comment.module";
import { DatabaseModule } from "./database/database.module";
import { FolderModule } from "./folder/folder.module";
import { GroupModule } from "./group/group.module";
import { MessageModule } from "./message/message.module";
import { PostModule } from "./post/post.module";
import { ServerModule } from "./server/server.module";
import { UserModule } from "./user/user.module";

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
      }),
    }),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: "../schema.graphql",
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    FolderModule,
    ServerModule,
    GroupModule,
    PostModule,
    ChannelModule,
    CommentModule,
    MessageModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
