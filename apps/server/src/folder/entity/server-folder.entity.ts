import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKeyType,
  Property,
} from "@mikro-orm/core";
import { Server } from "../../server/entity/server.entity";
import { ReorderUtils } from "../../common/util/reorder-utils";
import { Folder } from "./folder.entity";

@Entity()
export class ServerFolder {
  @ManyToOne({ entity: () => Server, primary: true })
  server: Server;

  @OneToOne({ entity: () => Folder, primary: true })
  folder: Folder;

  [PrimaryKeyType]: [string, string];

  @Property({ columnType: "text" })
  position: string = ReorderUtils.FIRST_POSITION;
}
