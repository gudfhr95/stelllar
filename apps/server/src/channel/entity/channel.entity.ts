import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "../../common/entity/base.entity";
import { Server } from "../../server/entity/server.entity";
import { ReorderUtils } from "../../common/util/reorder-utils";
import { Message } from "../../message/entity/message.entity";
import { ChannelType } from "./channel-type.entity";
import { GraphQLNonNegativeInt } from "graphql-scalars";
import { GraphQLBoolean } from "graphql/type";

@ObjectType({ implements: BaseEntity })
@Entity()
export class Channel extends BaseEntity {
  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  description?: string;

  @OneToMany(() => Message, "channel")
  messages = new Collection<Message>(this);

  @Field(() => Server)
  @ManyToOne({ entity: () => Server, inversedBy: "channels" })
  server: Server;

  @Property({ columnType: "text" })
  position: string = ReorderUtils.FIRST_POSITION;

  @Field(() => ChannelType)
  @Enum({ items: () => ChannelType })
  type: ChannelType = ChannelType.Public;

  @Property({ columnType: "boolean" })
  isDeleted = false;

  @Property()
  lastMessageAt: Date = new Date();

  @Field(() => GraphQLNonNegativeInt)
  mentionCount = 0;

  @Field(() => GraphQLBoolean)
  isUnread = true;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean", default: false })
  isDefault = false;
}
