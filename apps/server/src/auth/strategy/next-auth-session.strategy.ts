import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-custom";
import { AuthService } from "../auth.service";

const cookieName = "next-auth.session-token";

@Injectable()
export class NextAuthSessionStrategy extends PassportStrategy(
  Strategy,
  "next-auth-session"
) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request) {
    const sessionToken = req.cookies[cookieName];
    if (!sessionToken) {
      throw new UnauthorizedException({ message: "No session token" });
    }

    return await this.authService.verifySessionAndGetUser(sessionToken);
  }
}
