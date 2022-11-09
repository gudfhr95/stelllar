import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  QueryOrder,
} from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { defaultEntities } from "@next-auth/mikro-orm-adapter";
import { GraphQLEmailAddress, GraphQLNonNegativeInt } from "graphql-scalars";
import { GraphQLBoolean } from "graphql/type";
import { BaseEntity } from "../../common/entity/base.entity";
import { Folder } from "../../folder/entity/folder.entity";
import { UserFolder } from "../../folder/entity/user-folder.entity";
import { GroupUser } from "../../group/entity/group-user.entity";
import { Group } from "../../group/entity/group.entity";
import { ServerUser } from "../../server/entity/server-user.entity";
import { Server } from "../../server/entity/server.entity";
import { OnlineStatus } from "./online-status.enum";
import { RelationshipStatus } from "./relationship-status.enum";
import { Relationship } from "./relationship.entity";

@ObjectType()
@Entity()
export class User implements BaseEntity, defaultEntities.User {
  @Field(() => ID)
  @PrimaryKey()
  id!: string;

  @Field()
  @Property({ type: "Date", nullable: true, default: "now" })
  createdAt: Date = new Date();

  @Field()
  @Property({ columnType: "text", unique: true })
  name: string;

  @Field(() => GraphQLEmailAddress)
  @Property({ columnType: "text", unique: true })
  email: string;

  @Property({ type: "Date", nullable: true })
  emailVerified: Date | null = null;

  @Field({ nullable: true })
  @Property({ nullable: true })
  image?: string;

  @OneToMany({
    entity: () => defaultEntities.Session,
    mappedBy: (session) => session.user,
    hidden: true,
    orphanRemoval: true,
    cascade: [Cascade.ALL],
  })
  sessions = new Collection<defaultEntities.Session>(this);

  @OneToMany({
    entity: () => defaultEntities.Account,
    mappedBy: (account) => account.user,
    hidden: true,
    orphanRemoval: true,
    cascade: [Cascade.ALL],
  })
  accounts = new Collection<defaultEntities.Account>(this);

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastLoginAt?: Date;

  @Field({ nullable: true })
  lastMessageAt?: Date;

  @Field(() => OnlineStatus)
  @Enum({ items: () => OnlineStatus })
  onlineStatus: OnlineStatus = OnlineStatus.Online;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isAdmin = false;

  @Field()
  isCurrentUser: boolean;

  @Property({ columnType: "boolean" })
  isDeleted = false;

  @Property({ columnType: "boolean" })
  isBanned = false;

  @Property({ nullable: true, columnType: "text" })
  banReason?: string;

  @OneToMany(() => UserFolder, "user", {
    orderBy: { position: QueryOrder.ASC },
  })
  userFolders = new Collection<UserFolder>(this);

  @OneToMany(() => ServerUser, "user", {
    orderBy: { position: QueryOrder.ASC },
  })
  serverUsers = new Collection<ServerUser>(this);

  @OneToMany(() => GroupUser, "user", {
    orderBy: { lastMessageAt: QueryOrder.DESC },
  })
  groupUsers = new Collection<GroupUser>(this);

  @Field(() => [Group])
  @ManyToMany(() => Group, "users")
  groups: Group[];

  @OneToMany(() => Relationship, "owner")
  relationships = new Collection<Relationship>(this);

  @Field(() => [User])
  relatedUsers: User[];

  @Field(() => [Folder])
  folders: Folder[];

  @Field(() => [Server])
  servers: Server[];

  @Field(() => GraphQLNonNegativeInt)
  unreadCount: number;

  @Field()
  showChat: boolean;

  @Field(() => RelationshipStatus)
  relationshipStatus: RelationshipStatus;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean", default: false })
  isOg = false;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean", default: false })
  isStaff = false;

  @Field()
  get isOnline(): boolean {
    if (!this.lastLoginAt) return false;
    const timeout = 5 * 60 * 1000; // five minutes
    return new Date().getTime() - this.lastLoginAt.getTime() < timeout;
  }
}
