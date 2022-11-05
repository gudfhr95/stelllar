import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "../../common/entity/base.entity";
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
  QueryOrder,
} from "@mikro-orm/core";
import { Role } from "./role.entity";
import { User } from "../../user/entity/user.entity";
import { ServerUser } from "./server-user.entity";
import { Post } from "../../post/entity/post.entity";
import { ServerFolder } from "../../folder/entity/server-folder.entity";
import { Folder } from "../../folder/entity/folder.entity";
import { ServerCategory } from "./server-category.enum";
import { GraphQLNonNegativeInt } from "graphql-scalars";
import { Channel } from "../../channel/entity/channel.entity";
import { ServerPermission } from "./server-permission.enum";
import { GraphQLBoolean } from "graphql/type";

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

  @Field(() => [Role])
  @OneToMany(() => Role, "server", {
    orderBy: { createdAt: QueryOrder.DESC },
  })
  roles = new Collection<Role>(this);

  @OneToMany(() => ServerUser, "server", {
    orderBy: { position: QueryOrder.ASC },
  })
  userJoins = new Collection<ServerUser>(this);

  @OneToMany(() => ServerFolder, "server", {
    orderBy: { position: QueryOrder.ASC },
  })
  serverFolders = new Collection<ServerFolder>(this);

  @Field(() => [Folder])
  folders: Folder[];

  @Field(() => ServerCategory)
  @Enum({ items: () => ServerCategory })
  category: ServerCategory = ServerCategory.Other;

  @Field(() => GraphQLNonNegativeInt)
  @Property({ columnType: "int", unsigned: true })
  userCount = 0;

  @Field(() => GraphQLNonNegativeInt)
  onlineCount = 0;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  avatarUrl?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  bannerUrl?: string;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isBanned = false;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isDeleted = false;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isPublic = true;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isChatEnabled = true;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isDownvotesEnabled = false;

  @Field(() => [Channel])
  @OneToMany(() => Channel, "server", {
    orderBy: { position: QueryOrder.ASC },
  })
  channels = new Collection<Channel>(this);

  @Field(() => [ServerPermission])
  permissions: ServerPermission[];

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isFeatured = false;

  @Field()
  isJoined: boolean;
}
