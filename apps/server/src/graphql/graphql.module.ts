import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
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
    }),
  ],
})
export class GraphqlModule {}
