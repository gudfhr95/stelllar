import { QueryOrder } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ReorderUtils } from "../common/util/reorder-utils";
import { Server } from "../server/entity/server.entity";
import { User } from "../user/entity/user.entity";
import { Channel } from "./entity/channel.entity";

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: EntityRepository<Channel>,
    @InjectRepository(Server)
    private readonly serverRepository: EntityRepository<Server>
  ) {}

  async createChannel(
    serverId: string,
    user: User,
    name: string,
    description: string
  ) {
    const server = await this.serverRepository.findOneOrFail({
      id: serverId,
      isDeleted: false,
    });

    name = name.trim();
    if (await this.existsChannelByName(name)) {
      throw new HttpException("duplicateName", HttpStatus.BAD_REQUEST);
    }

    description = description.trim();

    const firstChannel = await this.channelRepository.findOne(
      { server, isDeleted: false },
      { orderBy: { position: QueryOrder.ASC } }
    );

    const channel = this.channelRepository.create({
      name,
      description,
      server,
      position: firstChannel
        ? ReorderUtils.positionBefore(firstChannel.position)
        : ReorderUtils.FIRST_POSITION,
    });

    await this.channelRepository.persistAndFlush(channel);

    return channel;
  }

  async existsChannelByName(name: string) {
    return !!(await this.channelRepository.findOne({ name, isDeleted: false }));
  }
}
