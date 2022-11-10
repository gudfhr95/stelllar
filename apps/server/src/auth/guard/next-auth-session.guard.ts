import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class NextAuthSessionGuard extends AuthGuard("next-auth-session") {}
