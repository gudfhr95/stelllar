import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import client from "../../../../../apollo-client";
import { Post, Server, ServerDocument } from "../../../../../src/graphql/hooks";
import ServerLayout from "../../../../../src/layouts/ServerLayout";

export default function PostPage({
  server,
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <ServerLayout server={server}></ServerLayout>;
}

export const getServerSideProps: GetServerSideProps<{
  server: Server;
  post: Post;
}> = async ({ req, params, query, locale }) => {
  const { data: serverData } = await client.query({
    query: ServerDocument,
    variables: {
      name: params?.server,
    },
    fetchPolicy: "no-cache",
    context: {
      headers: {
        cookie: req.headers.cookie,
      },
    },
  });

  console.log(params);
  console.log(query);

  return {
    props: {
      server: serverData?.server,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "home",
        "explore",
        "server",
        "post",
      ])),
    },
  };
};
