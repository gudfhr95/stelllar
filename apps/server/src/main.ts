import { Logger } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { graphqlUploadExpress } from "graphql-upload-minimal";
import { AppModule } from "./app.module";
import { GqlNextAuthSessionGuard } from "./auth/guard/gql-next-auth-session.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://stelllar.co",
    ],
    allowedHeaders: ["Cookie", "Content-Type"],
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
  });

  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new GqlNextAuthSessionGuard(reflector));

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
