import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "../../common/entity/base.entity";
import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { User } from "../../user/entity/user.entity";
import { GraphQLNonNegativeInt } from "graphql-scalars";
import { FolderVisibility } from "./folder-visibility.enum";
import { Server } from "../../server/entity/server.entity";
import { GraphQLBoolean } from "graphql/type";

@ObjectType({ implements: BaseEntity })
@Entity()
export class Folder extends BaseEntity {
  @Field()
  @Property({ columnType: "text" })
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  description?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  avatarUrl?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  owner?: User;

  @Field(() => Server, { nullable: true })
  @ManyToOne({ entity: () => Server, nullable: true })
  server?: Server;

  @Property({ columnType: "boolean" })
  isDeleted = false;

  @Field(() => GraphQLNonNegativeInt)
  @Property({ columnType: "int", unsigned: true })
  postCount = 0;

  @Field(() => GraphQLNonNegativeInt)
  @Property({ columnType: "int" })
  followerCount = 0;

  @Field()
  isFollowing: boolean;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isCollaborative = false;

  @Field(() => FolderVisibility)
  @Enum({ items: () => FolderVisibility })
  visibility: FolderVisibility = FolderVisibility.Public;
}
