import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  QueryOrder,
} from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLNonNegativeInt } from "graphql-scalars";
import { BaseEntity } from "../../common/entity/base.entity";
import { Message } from "../../message/entity/message.entity";
import { User } from "../../user/entity/user.entity";

@ObjectType({ implements: BaseEntity })
@Entity()
export class Group extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  owner: User;

  @Field()
  @Property({ columnType: "text" })
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  avatarUrl?: string;

  @Field()
  @Property()
  lastMessageAt: Date = new Date();

  @Field(() => [User])
  @ManyToMany(() => User, "groups", {
    owner: true,
    orderBy: { nickname: QueryOrder.ASC },
  })
  users = new Collection<User>(this);

  @OneToMany(() => Message, "group")
  messages = new Collection<Message>(this);

  @Field(() => GraphQLNonNegativeInt)
  unreadCount = 0;
}
