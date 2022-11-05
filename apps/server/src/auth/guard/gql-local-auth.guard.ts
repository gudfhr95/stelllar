import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { LoginInput } from "../input/login.input";

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard("local") {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    req.body = ctx.getArgs<LoginInput>()["input"];

    return req;
  }
}
