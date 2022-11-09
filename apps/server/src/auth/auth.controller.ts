import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { NextAuthSessionGuard } from "./guard/next-auth-session.guard";
import RequestWithUser from "./interface/request-with-user.interface";

@Controller("auth/google")
export class AuthController {
  @UseGuards(NextAuthSessionGuard)
  @Get()
  async test(@Req() request: RequestWithUser) {
    console.log(request.user);
    return "test";
  }
}
