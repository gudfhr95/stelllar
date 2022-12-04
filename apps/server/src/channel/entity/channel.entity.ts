import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "../../common/entity/base.entity";
import { ReorderUtils } from "../../common/util/reorder-utils";
import { Server } from "../../server/entity/server.entity";

@ObjectType({ implements: BaseEntity })
@Entity()
export class Channel extends BaseEntity {
  @Field()
  @Property({ columnType: "text" })
  name: string;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: "text" })
  description?: string;

  @Field(() => Server)
  @ManyToOne({ entity: () => Server, inversedBy: "channels" })
  server: Server;

  @Property({ columnType: "text" })
  position: string = ReorderUtils.FIRST_POSITION;

  @Property({ columnType: "boolean" })
  isDeleted = false;
}
