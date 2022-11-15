import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import client from "../../apollo-client";
import CreatePostHeader from "../../src/components/post/CreatePostHeader";
import ServerPosts from "../../src/components/server/ServerPosts";
import { Server, ServerDocument } from "../../src/graphql/hooks";
import useAuth from "../../src/hooks/useAuth";
import ServerLayout from "../../src/layouts/ServerLayout";

export default function ServerPage({
  server,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const user = useAuth();

  return (
    <ServerLayout server={server}>
      <ServerPosts
        serverId={server.id}
        header={
          !!user ? (
            <CreatePostHeader serverId={server.id} />
          ) : (
            <div className="h-4" />
          )
        }
      />
    </ServerLayout>
  );
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
        "post",
      ])),
    },
  };
};
