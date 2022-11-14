import { Injectable, Scope } from "@nestjs/common";
import * as DataLoader from "dataloader";
import { Server } from "../server/entity/server.entity";
import { ServerService } from "../server/server.service";

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  constructor(private serverService: ServerService) {}

  public readonly userServersLoader = (userId: string) => {
    return new DataLoader<string, Server[]>(async (userIds: string[]) => {
      if (!userId) {
        return userIds.map(() => []);
      }

      const serverUsers = await this.serverService.getServerUsersByUserIds(
        userIds
      );

      return userIds.map((userId) =>
        serverUsers
          .filter((su) => su.user.id === userId)
          .flatMap((su) => su.server)
      );
    });
  };
}
