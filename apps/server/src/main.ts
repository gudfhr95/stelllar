import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { graphqlUploadExpress } from "graphql-upload-minimal";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    allowedHeaders: ["Cookie", "Content-Type"],
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
  });
  app.use(cookieParser());

  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
