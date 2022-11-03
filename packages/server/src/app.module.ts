import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { FolderModule } from './folder/folder.module';
import { ServerModule } from './server/server.module';
import { GroupModule } from './group/group.module';
import { PostModule } from './post/post.module';
import { ChannelModule } from './channel/channel.module';
import { CommentModule } from './comment/comment.module';
import { MessageModule } from './message/message.module';

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
      autoSchemaFile: 'packages/server/src/schema.gql',
    }),
    UserModule,
    FolderModule,
    ServerModule,
    GroupModule,
    PostModule,
    ChannelModule,
    CommentModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
