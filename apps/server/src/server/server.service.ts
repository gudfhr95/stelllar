import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload-minimal";
import { ReorderUtils } from "../common/util/reorder-utils";
import { FileService } from "../file/file.service";
import { User } from "../user/entity/user.entity";
import { ServerCategory } from "./entity/server-category.enum";
import { ServerUserStatus } from "./entity/server-user-status.enum";
import { ServerUser } from "./entity/server-user.entity";
import { Server } from "./entity/server.entity";

@Injectable()
export class ServerService {
  constructor(
    private readonly fileService: FileService,
    @InjectRepository(Server)
    private readonly serverRepository: EntityRepository<Server>,
    @InjectRepository(ServerUser)
    private readonly serverUserRepository: EntityRepository<ServerUser>
  ) {}

  async createServer(
    user: User,
    name: string,
    displayName: string,
    description: string,
    category: ServerCategory,
    avatarFile: Promise<FileUpload>,
    bannerFile: Promise<FileUpload>
  ) {
    name = name.trim();
    displayName = displayName.trim();
    description = description.trim();

    let avatarUrl = null;
    if (avatarFile) {
      avatarUrl = await this.fileService.uploadSingleFile(
        avatarFile,
        {
          width: 256,
          height: 256,
        },
        true
      );
    }

    let bannerUrl = null;
    if (bannerFile) {
      bannerUrl = await this.fileService.uploadSingleFile(
        bannerFile,
        {
          width: 256,
          height: 256,
        },
        true
      );
    }

    const server = this.serverRepository.create({
      name,
      displayName,
      description,
      category,
      avatarUrl,
      bannerUrl,
      owner: user.id,
      userCount: 1,
    });
    await this.serverRepository.persistAndFlush(server);

    const serverUser = this.serverUserRepository.create({
      server,
      user: user.id,
      position: ReorderUtils.FIRST_POSITION,
    });
    await this.serverUserRepository.persistAndFlush(serverUser);

    return server;
  }

  async getServerByName(name: string) {
    return await this.serverRepository.findOne({ name });
  }

  async getServerUsersByServerIdsAndUserId(
    serverIds: string[],
    userId: string
  ) {
    return await this.serverUserRepository.find({
      server: serverIds,
      user: userId,
      status: ServerUserStatus.Joined,
    });
  }
}
