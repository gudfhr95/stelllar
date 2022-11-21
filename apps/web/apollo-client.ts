import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: offsetLimitPagination(),
        },
      },
    },
  }),
});

export default client;
