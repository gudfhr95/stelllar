import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Server } from '../../server/entity/server.entity';
import { ReorderUtils } from '../../common/util/reorder-utils';

@Entity()
export class ServerFolder {
  @ManyToOne({ entity: () => Server, primary: true })
  server: Server;

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION;
}
