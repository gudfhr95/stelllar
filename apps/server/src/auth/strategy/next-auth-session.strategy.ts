import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-custom";
import { AuthService } from "../auth.service";

export const COOKIE_NAME = "next-auth.session-token";

@Injectable()
export class NextAuthSessionStrategy extends PassportStrategy(
  Strategy,
  "next-auth-session"
) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request) {
    const sessionToken = req.cookies[COOKIE_NAME];
    if (!sessionToken) {
      throw new UnauthorizedException({ message: "No session token" });
    }

    return await this.authService.verifySessionAndGetUser(sessionToken);
  }
}
