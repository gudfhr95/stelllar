import { Entity, ManyToOne, PrimaryKeyType, Property } from "@mikro-orm/core";
import { User } from "../../user/entity/user.entity";
import { Channel } from "./channel.entity";

@Entity()
export class ChannelUser {
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  @ManyToOne({ entity: () => Channel, primary: true })
  channel: Channel;

  [PrimaryKeyType]: [string, string];

  @Property()
  lastViewAt: Date = new Date();

  @Property({ columnType: "int" })
  mentionCount = 0;
}
