import {
  Collection,
  Embedded,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "../../common/entity/base.entity";
import { Post } from "../../post/entity/post.entity";
import { User } from "../../user/entity/user.entity";
import { ServerUser } from "../../server/entity/server-user.entity";
import { VoteType } from "../../common/entity/vote-type.enum";
import { CommentVote } from "./comment-vote.entity";
import { LinkMetadata } from "../../common/entity/link-metadata.entity";
import { GraphQLBoolean } from "graphql/type";

@ObjectType({ implements: BaseEntity })
@Entity()
export class Comment extends BaseEntity {
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  author?: User;

  @Field(() => ServerUser, { nullable: true })
  serverUser?: ServerUser;

  @Field(() => Post)
  @ManyToOne(() => Post)
  post: Post;

  @Field()
  @Property({ columnType: "text" })
  text: string;

  @Field(() => Comment, { nullable: true })
  @ManyToOne({ entity: () => Comment, nullable: true })
  parentComment?: Comment;

  @Field(() => Int)
  @Property({ columnType: "int" })
  voteCount = 0;

  @Field(() => VoteType)
  voteType: VoteType = VoteType.None;

  @OneToMany(() => CommentVote, "comment")
  votes = new Collection<CommentVote>(this);

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isPinned = false;

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinnedAt?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true })
  updatedAt?: Date;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isDeleted = false;

  @Field(() => [LinkMetadata])
  @Embedded(() => LinkMetadata, { object: true, array: true })
  linkMetadatas: LinkMetadata[] = [];
}
