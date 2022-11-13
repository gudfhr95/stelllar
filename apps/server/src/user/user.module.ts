import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FileModule } from "../file/file.module";
import { User } from "./entity/user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [MikroOrmModule.forFeature([User]), ConfigModule, FileModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
