import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  QueryOrder,
} from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { defaultEntities } from "@next-auth/mikro-orm-adapter";
import { GraphQLEmailAddress } from "graphql-scalars";
import { GraphQLBoolean } from "graphql/type";
import { BaseEntity } from "../../common/entity/base.entity";
import { ServerUser } from "../../server/entity/server-user.entity";
import { Server } from "../../server/entity/server.entity";

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
  @Property({ columnType: "text" })
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

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isAdmin = false;

  @Property({ columnType: "boolean" })
  isDeleted = false;

  @OneToMany(() => ServerUser, "user", {
    orderBy: { position: QueryOrder.ASC },
  })
  serverUsers = new Collection<ServerUser>(this);

  @Field(() => [Server])
  servers: Server[];
}
