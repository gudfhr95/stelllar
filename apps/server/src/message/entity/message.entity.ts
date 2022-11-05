import {
  Collection,
  Embedded,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "../../common/entity/base.entity";
import { User } from "../../user/entity/user.entity";
import { ServerUser } from "../../server/entity/server-user.entity";
import { Channel } from "../../channel/entity/channel.entity";
import { Group } from "../../group/entity/group.entity";
import { Image } from "../../common/entity/image.entity";
import { LinkMetadata } from "../../common/entity/link-metadata.entity";
import { File } from "./file.entity";
import { MessageType } from "./message-type.enum";
import { GraphQLBoolean } from "graphql/type";

@ObjectType({ implements: BaseEntity })
@Entity()
export class Message extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  author: User;

  @Field(() => ServerUser, { nullable: true })
  serverUser?: ServerUser;

  @Field(() => Channel, { nullable: true })
  @ManyToOne(() => Channel, { nullable: true })
  channel?: Channel;

  @Field(() => Group, { nullable: true })
  @ManyToOne({
    entity: () => Group,
    nullable: true,
    inversedBy: "messages",
  })
  group?: Group;

  @Field(() => User, { nullable: true })
  @ManyToOne({
    entity: () => User,
    nullable: true,
  })
  toUser?: User;

  @Field({ nullable: true })
  @Property({ columnType: "text", nullable: true })
  text?: string;

  @Field(() => [Image])
  @Embedded(() => Image, { object: true, array: true })
  images: Image[] = [];

  @Field({ nullable: true })
  @Embedded(() => File, { object: true, nullable: true })
  file?: File;

  @Field(() => [LinkMetadata])
  @Embedded(() => LinkMetadata, { object: true, array: true })
  linkMetadatas: LinkMetadata[] = [];

  @Field(() => [User])
  @ManyToMany(() => User)
  mentionedUsers = new Collection<User>(this);

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isEveryoneMentioned = false;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isPinned = false;

  @Field({ nullable: true })
  @Property({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinnedAt?: Date;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isDeleted = false;

  @Field(() => MessageType)
  @Enum({ items: () => MessageType })
  type: MessageType = MessageType.Normal;
}
