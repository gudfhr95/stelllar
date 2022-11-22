import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { defaultEntities } from "@next-auth/mikro-orm-adapter";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { NextAuthSessionStrategy } from "./strategy/next-auth-session.strategy";

@Module({
  imports: [
    MikroOrmModule.forFeature([defaultEntities.Session]),
    PassportModule,
    UserModule,
  ],
  providers: [AuthService, NextAuthSessionStrategy],
})
export class AuthModule {}
