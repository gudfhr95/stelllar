import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { GraphQLBoolean } from "graphql/type";
import { BaseEntity } from "../../common/entity/base.entity";
import { VoteType } from "../../common/entity/vote-type.enum";
import { Post } from "../../post/entity/post.entity";
import { ServerUser } from "../../server/entity/server-user.entity";
import { User } from "../../user/entity/user.entity";
import { CommentVote } from "./comment-vote.entity";

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

  @Field({ nullable: true })
  @Property({ nullable: true })
  updatedAt?: Date;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isDeleted = false;
}
