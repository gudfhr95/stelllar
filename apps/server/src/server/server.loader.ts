import { Injectable, Scope } from "@nestjs/common";
import * as DataLoader from "dataloader";
import { ServerService } from "./server.service";

@Injectable({ scope: Scope.REQUEST })
export class ServerLoader {
  constructor(private serverService: ServerService) {}

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
}
