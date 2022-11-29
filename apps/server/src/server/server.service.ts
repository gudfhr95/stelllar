import { QueryOrder } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload-minimal";
import { ReorderUtils } from "../common/util/reorder-utils";
import { FileService } from "../file/file.service";
import { User } from "../user/entity/user.entity";
import { ServerCategory } from "./entity/server-category.enum";
import { ServerUserStatus } from "./entity/server-user-status.enum";
import { ServerUser } from "./entity/server-user.entity";
import { Server } from "./entity/server.entity";
import { PublicServersSort } from "./input/public-server.input";

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
    if (await this.existsServerByName(name)) {
      throw new HttpException("duplicateName", HttpStatus.BAD_REQUEST);
    }

    displayName = displayName.trim();
    description = description.trim();

    let avatarUrl = null;
    if (avatarFile) {
      avatarUrl = await this.fileService.uploadSingleFile(
        avatarFile,
        { width: 256, height: 256 },
        true
      );
    }

    let bannerUrl = null;
    if (bannerFile) {
      bannerUrl = await this.fileService.uploadSingleFile(
        bannerFile,
        { width: 1920, height: 1080 },
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

  async updateServer(
    serverId: string,
    user: User,
    displayName: string,
    description: string,
    category: ServerCategory,
    avatarFile: Promise<FileUpload>,
    bannerFile: Promise<FileUpload>
  ) {
    const server = await this.serverRepository.findOneOrFail({
      id: serverId,
      owner: user,
    });

    displayName = displayName.trim();
    description = description.trim();

    let avatarUrl = null;
    if (avatarFile) {
      if (server.avatarUrl) {
        const splited = server.avatarUrl.split("/");
        const key = splited[splited.length - 1];

        await this.fileService.deleteFileInS3(key);
      }

      avatarUrl = await this.fileService.uploadSingleFile(
        avatarFile,
        { width: 256, height: 256 },
        true
      );
    }

    let bannerUrl = null;
    if (bannerFile) {
      if (server.bannerUrl) {
        const splited = server.bannerUrl.split("/");
        const key = splited[splited.length - 1];

        await this.fileService.deleteFileInS3(key);
      }

      bannerUrl = await this.fileService.uploadSingleFile(
        bannerFile,
        { width: 1920, height: 1080 },
        true
      );
    }

    server.displayName = displayName;
    server.description = description;
    server.category = category;
    server.avatarUrl = avatarUrl ?? server.avatarUrl;
    server.bannerUrl = bannerUrl ?? server.bannerUrl;

    await this.serverRepository.persistAndFlush(server);

    return server;
  }

  async getPublicServers(sort: PublicServersSort, category: ServerCategory) {
    let where = {};
    if (category) {
      where = { category };
    }

    let orderBy = {};
    if (sort === PublicServersSort.New) {
      orderBy = { createdAt: QueryOrder.DESC };
    } else if (sort === PublicServersSort.Top) {
      orderBy = {
        userCount: QueryOrder.DESC,
        postCount: QueryOrder.DESC,
        createdAt: QueryOrder.DESC,
      };
    }

    return await this.serverRepository.find(where, { orderBy });
  }

  async getServerByName(name: string) {
    return await this.serverRepository.findOneOrFail({
      name,
      isDeleted: false,
    });
  }

  async joinServer(serverId: string, user: User) {
    let serverUser = await this.serverUserRepository.findOne({
      server: serverId,
      user: user.id,
    });

    if (!serverUser) {
      serverUser = this.serverUserRepository.create({
        server: serverId,
        user: user,
      });
    }
    serverUser.status = ServerUserStatus.Joined;

    await this.serverUserRepository.persistAndFlush(serverUser);

    const server = await this.serverRepository.findOneOrFail({ id: serverId });

    server.userCount += 1;

    await this.serverRepository.persistAndFlush(server);

    return server;
  }

  async leaveServer(serverId: string, user: User) {
    const serverUser = await this.serverUserRepository.findOneOrFail({
      server: serverId,
      user: user.id,
      status: ServerUserStatus.Joined,
    });
    serverUser.status = ServerUserStatus.None;
    await this.serverUserRepository.persistAndFlush(serverUser);

    const server = await this.serverRepository.findOneOrFail({ id: serverId });
    server.userCount -= 1;
    await this.serverRepository.persistAndFlush(server);

    return server;
  }

  async existsServerByName(name: string) {
    return !!(await this.serverRepository.findOne({
      name,
      isDeleted: false,
    }));
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

  async getServerUsersByUserIds(userIds: string[]) {
    return await this.serverUserRepository.find(
      {
        user: userIds,
        status: ServerUserStatus.Joined,
      },
      { populate: ["server"], orderBy: { position: QueryOrder.ASC } }
    );
  }
}
