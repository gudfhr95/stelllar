import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { COOKIE_NAME } from "../strategy/next-auth-session.strategy";

@Injectable()
export class GqlNextAuthSessionGuard extends AuthGuard("next-auth-session") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride("isPublic", [
      context.getHandler(),
      context.getClass(),
    ]);

    const ctx = GqlExecutionContext.create(context);
    const sessionToken = ctx.getContext().req.cookies[COOKIE_NAME];
    if (sessionToken) {
      return super.canActivate(context);
    }

    return isPublic;
  }
}
