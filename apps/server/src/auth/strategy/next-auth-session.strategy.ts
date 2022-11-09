import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-custom";
import UserService from "../../user/user.service";
import { AuthService } from "../auth.service";

const cookieName = "next-auth.session-token";

@Injectable()
export class NextAuthSessionStrategy extends PassportStrategy(
  Strategy,
  "next-auth-session"
) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super();
  }

  async validate(req: Request) {
    const sessionToken = req.cookies[cookieName];
    if (!sessionToken) {
      throw new UnauthorizedException({ message: "No session token" });
    }

    const session = await this.authService.verifySession(sessionToken);
    if (!session) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: "Invalid Session",
      });
    }

    return await this.userService.getUserById(session.userId);
  }
}
