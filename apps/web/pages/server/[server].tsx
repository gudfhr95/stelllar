import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import client from "../../apollo-client";
import { Server, ServerDocument } from "../../src/graphql/hooks";
import ServerLayout from "../../src/layouts/ServerLayout";

export default function ServerPage({
  server,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <ServerLayout server={server}></ServerLayout>;
}

export const getServerSideProps: GetServerSideProps<{
  server: Server;
}> = async ({ req, params, locale }) => {
  const { data } = await client.query({
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

  if (!data.server) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      server: data.server,
      ...(await serverSideTranslations(locale as string, [
        "bottom-bar",
        "settings",
        "server-list",
        "create-server",
        "server",
      ])),
    },
  };
};
