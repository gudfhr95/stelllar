import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property,
} from "@mikro-orm/core";
import { Post } from "./post.entity";
import { User } from "../../user/entity/user.entity";
import { Field } from "@nestjs/graphql";
import { VoteType } from "../../common/entity/vote-type.enum";

@Entity()
export class PostVote {
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  @ManyToOne({ entity: () => Post, primary: true })
  post: Post;

  [PrimaryKeyType]: [string, string];

  @Property()
  createdAt: Date = new Date();

  @Field(() => VoteType)
  @Enum({ items: () => VoteType })
  type: VoteType = VoteType.None;
}
