import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FileModule } from "../file/file.module";
import { ServerModule } from "../server/server.module";
import { User } from "./entity/user.entity";
import { UserLoader } from "./user.loader";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    ConfigModule,
    FileModule,
    ServerModule,
  ],
  providers: [UserResolver, UserService, UserLoader],
  exports: [UserService],
})
export class UserModule {}
