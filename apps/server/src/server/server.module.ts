import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Channel } from "../channel/entity/channel.entity";
import { FileModule } from "../file/file.module";
import { ServerUser } from "./entity/server-user.entity";
import { Server } from "./entity/server.entity";
import { ServerLoader } from "./server.loader";
import { ServerResolver } from "./server.resolver";
import { ServerService } from "./server.service";

@Module({
  imports: [
    MikroOrmModule.forFeature([Server, ServerUser, Channel]),
    FileModule,
  ],
  providers: [ServerResolver, ServerService, ServerLoader],
  exports: [ServerService],
})
export class ServerModule {}
