import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Collection,
  Embedded,
  Entity,
  Formula,
  ManyToOne,
  OneToMany,
  Property,
  QueryOrder,
} from '@mikro-orm/core';
import { BaseEntity } from '../../common/entity/base.entity';
import { Server } from '../../server/entity/server.entity';
import { LinkMetadata } from '../../common/entity/link-metadata.entity';
import { PostImage } from './post-image.entity';
import { User } from '../../user/entity/user.entity';
import { ServerUser } from '../../server/entity/server-user.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { FolderPost } from '../../folder/entity/folder-post.entity';
import { Folder } from '../../folder/entity/folder.entity';
import { VoteType } from './vote-type.enum';
import { PostVote } from './post-vote.entity';
import { GraphQLNonNegativeInt } from 'graphql-scalars';
import { GraphQLBoolean } from 'graphql/type';

@ObjectType({ implements: BaseEntity })
@Entity()
export class Post extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  title: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  text?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  linkUrl?: string;

  @Field(() => LinkMetadata, { nullable: true })
  @Embedded({ entity: () => LinkMetadata, nullable: true, object: true })
  linkMetadata?: LinkMetadata;

  @Field(() => [LinkMetadata])
  @Embedded(() => LinkMetadata, { object: true, array: true })
  linkMetadatas: LinkMetadata[] = [];

  @Field(() => [PostImage])
  @Embedded(() => PostImage, { object: true, array: true })
  images: PostImage[] = [];

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  author?: User;

  @Field(() => ServerUser, { nullable: true })
  serverUser?: ServerUser;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: 'boolean' })
  isPinned = false;

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinnedAt?: Date;

  @OneToMany(() => Comment, 'post')
  comments = new Collection<Comment>(this);

  @Field(() => Server)
  @ManyToOne({ entity: () => Server })
  server: Server;

  @OneToMany(() => FolderPost, 'post', {
    orderBy: { addedAt: QueryOrder.DESC },
  })
  folderPosts = new Collection<FolderPost>(this);

  @Field(() => [Folder], { nullable: true })
  folders?: Folder[];

  @Field(() => Int)
  @Property({ columnType: 'int' })
  voteCount = 0;

  @Field(() => VoteType)
  voteType: VoteType = VoteType.None;

  @OneToMany(() => PostVote, 'post')
  votes = new Collection<PostVote>(this);

  @Field(() => GraphQLNonNegativeInt)
  @Property({ columnType: 'int', unsigned: true })
  commentCount = 0;

  @Formula(
    '(CAST(vote_count AS float) + 1)/((CAST((CAST(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) AS int) -' +
      ' CAST(EXTRACT(EPOCH FROM created_at) AS int)+5000) AS FLOAT)/100.0)^(1.618))'
  )
  hotRank: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  updatedAt?: Date;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: 'boolean' })
  isDeleted = false;
}
