import { Field, ObjectType } from "@nestjs/graphql";
import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "../../common/entity/base.entity";
import { Server } from "./server.entity";
import { ServerUser } from "./server-user.entity";
import { GraphQLHexColorCode } from "graphql-scalars";
import {
  defaultServerPermissions,
  ServerPermission,
} from "./server-permission.enum";
import { GraphQLBoolean } from "graphql/type";

@ObjectType({ implements: BaseEntity })
@Entity()
export class Role extends BaseEntity {
  @Field()
  @Property({ columnType: "text" })
  name: string;

  @ManyToOne({ entity: () => Server, inversedBy: "roles" })
  server: Server;

  @OneToMany(() => ServerUser, "role")
  serverUsers = new Collection<ServerUser>(this);

  @Field(() => GraphQLBoolean)
  @Property({ columnType: "boolean" })
  isDefault = false;

  @Field(() => GraphQLHexColorCode, { nullable: true })
  @Property({ nullable: true })
  color?: string;

  @Field(() => [ServerPermission])
  @Enum({
    items: () => ServerPermission,
    array: true,
  })
  permissions: ServerPermission[] = defaultServerPermissions;
}
