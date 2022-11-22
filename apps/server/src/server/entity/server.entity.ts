import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
  QueryOrder,
} from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLNonNegativeInt } from "graphql-scalars";
import { GraphQLBoolean } from "graphql/type";
import { BaseEntity } from "../../common/entity/base.entity";
import { Post } from "../../post/entity/post.entity";
import { User } from "../../user/entity/user.entity";
import { ServerCategory } from "./server-category.enum";
import { ServerUser } from "./server-user.entity";

@ObjectType({ implements: BaseEntity })
@Entity()
export class Server extends BaseEntity {
  @Field()
  @Property({ columnType: "text" })
  name: string;

  @Field()
  @Property({ columnType: "text" })
  displayName: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  description?: string;

  @Field(() => User)
  @ManyToOne(() => User)
  owner: User;

  @OneToMany(() => Post, "server")
  posts = new Collection<Post>(this);

  @OneToMany(() => ServerUser, "server", {
    orderBy: { position: QueryOrder.ASC },
  })
  userJoins = new Collection<ServerUser>(this);

  @Field(() => ServerCategory)
  @Enum({ items: () => ServerCategory })
  category: ServerCategory = ServerCategory.Other;

  @Field(() => GraphQLNonNegativeInt)
  @Property({ columnType: "int", unsigned: true })
  userCount = 0;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  avatarUrl?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  bannerUrl?: string;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isDeleted = false;

  @Field()
  isJoined: boolean;
}
