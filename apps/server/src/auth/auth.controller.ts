import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { NextAuthSessionGuard } from "./guard/next-auth-session.guard";
import RequestWithUser from "./interface/request-with-user.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/session/:sessionToken")
  async getSession(@Param("sessionToken") sessionToken: string) {
    return await this.authService.verifySessionAndGetUser(sessionToken);
  }

  @UseGuards(NextAuthSessionGuard)
  @Get("/me")
  async test(@Req() request: RequestWithUser) {
    return request.user;
  }
}
