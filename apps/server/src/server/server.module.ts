import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { FileModule } from "../file/file.module";
import { ServerUser } from "./entity/server-user.entity";
import { Server } from "./entity/server.entity";
import { ServerResolver } from "./server.resolver";
import { ServerService } from "./server.service";

@Module({
  imports: [MikroOrmModule.forFeature([Server, ServerUser]), FileModule],
  providers: [ServerResolver, ServerService],
})
export class ServerModule {}
