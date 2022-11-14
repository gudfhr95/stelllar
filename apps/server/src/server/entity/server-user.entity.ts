import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { ReorderUtils } from "../../common/util/reorder-utils";
import { User } from "../../user/entity/user.entity";
import { Role } from "./role.entity";
import { ServerUserStatus } from "./server-user-status.enum";
import { Server } from "./server.entity";

@ObjectType()
@Entity()
export class ServerUser {
  @Field(() => User)
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  @ManyToOne({ entity: () => Server, primary: true })
  server: Server;

  [PrimaryKeyType]: [string, string];

  @Property({ columnType: "text" })
  position: string = ReorderUtils.FIRST_POSITION;

  @Property()
  createdAt: Date = new Date();

  @Field(() => Role)
  @ManyToOne({ entity: () => Role, inversedBy: "serverUsers", nullable: true })
  role: Role;

  @Enum({ items: () => ServerUserStatus })
  status: ServerUserStatus = ServerUserStatus.Joined;
}
