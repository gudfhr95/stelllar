import { NotFoundError } from "@mikro-orm/core";
import { ApolloDriver } from "@nestjs/apollo";
import { HttpStatus, Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: "../schema.graphql",
      uploads: false,
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
      context: ({ req, res }) => ({ req, res }),
      formatError: (error) => {
        const {
          extensions: {
            exception: { name },
          },
        } = error;

        if (name === NotFoundError.name) {
          return { message: error.message, statusCode: HttpStatus.NOT_FOUND };
        }

        return {
          message: error.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      },
    }),
  ],
})
export class GraphqlModule {}
