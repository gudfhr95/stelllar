import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Server } from "../server/entity/server.entity";
import { ChannelResolver } from "./channel.resolver";
import { ChannelService } from "./channel.service";
import { Channel } from "./entity/channel.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Channel, Server])],
  providers: [ChannelResolver, ChannelService],
})
export class ChannelModule {}
