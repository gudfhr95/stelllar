import { QueryOrder } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable, Scope } from "@nestjs/common";
import DataLoader from "dataloader";
import { Channel } from "../channel/entity/channel.entity";
import { ServerService } from "./server.service";

@Injectable({ scope: Scope.REQUEST })
export class ServerLoader {
  constructor(
    private serverService: ServerService,
    @InjectRepository(Channel)
    private readonly channelRepository: EntityRepository<Channel>
  ) {}

  public readonly serverJoinedLoader = (userId: string) => {
    return new DataLoader<string, boolean>(async (serverIds: string[]) => {
      if (!userId) {
        return serverIds.map(() => false);
      }

      const serverUsers =
        await this.serverService.getServerUsersByServerIdsAndUserId(
          serverIds,
          userId
        );

      return serverIds.map(
        (serverId) => !!serverUsers.find((su) => su.server.id === serverId)
      );
    });
  };

  public readonly serverChannelsLoader = () => {
    return new DataLoader<string, Channel[]>(async (serverIds: string[]) => {
      const channels = await this.channelRepository.find(
        {
          server: serverIds,
          isDeleted: false,
        },
        { orderBy: { position: QueryOrder.DESC } }
      );

      return serverIds.map((serverId) =>
        channels.filter((channel) => channel.server.id === serverId)
      );
    });
  };
}
