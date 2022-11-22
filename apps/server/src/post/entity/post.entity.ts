import {
  Collection,
  Embedded,
  Entity,
  Formula,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { GraphQLNonNegativeInt } from "graphql-scalars";
import { GraphQLBoolean } from "graphql/type";
import { Comment } from "../../comment/entity/comment.entity";
import { BaseEntity } from "../../common/entity/base.entity";
import { LinkMetadata } from "../../common/entity/link-metadata.entity";
import { VoteType } from "../../common/entity/vote-type.enum";
import { Server } from "../../server/entity/server.entity";
import { User } from "../../user/entity/user.entity";
import { PostImage } from "./post-image.entity";
import { PostVote } from "./post-vote.entity";

@ObjectType({ implements: BaseEntity })
@Entity()
export class Post extends BaseEntity {
  @Field()
  @Property({ columnType: "text" })
  title: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  text?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
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

  @Field({ nullable: true })
  thumbnailUrl: string | null;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  author?: User;

  @OneToMany(() => Comment, "post")
  comments = new Collection<Comment>(this);

  @Field(() => Server)
  @ManyToOne({ entity: () => Server })
  server: Server;

  @Field(() => Int)
  @Property({ columnType: "int" })
  voteCount = 0;

  @Field(() => VoteType)
  voteType: VoteType = VoteType.None;

  @OneToMany(() => PostVote, "post")
  votes = new Collection<PostVote>(this);

  @Field(() => GraphQLNonNegativeInt)
  @Property({ columnType: "int", unsigned: true })
  commentCount = 0;

  @Formula(
    "(CAST(vote_count AS float) + 1)/((CAST((CAST(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) AS int) -" +
      " CAST(EXTRACT(EPOCH FROM created_at) AS int)+5000) AS FLOAT)/100.0)^(1.618))"
  )
  hotRank: number;

  @Field({ nullable: true })
  @Property({ nullable: true })
  updatedAt?: Date;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isDeleted = false;
}
