import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import client from "../../apollo-client";
import PostList from "../../src/components/post/PostList";
import { PostsDocument, Server, ServerDocument } from "../../src/graphql/hooks";
import useAuth from "../../src/hooks/useAuth";
import ServerLayout from "../../src/layouts/ServerLayout";

export default function ServerPage({
  server,
  initialPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const user = useAuth();

  return (
    <ServerLayout server={server}>
      <PostList initialPosts={initialPosts} />
    </ServerLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  server: Server;
  initialPosts: [];
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

  const { data: postsData } = await client.query({
    query: PostsDocument,
    variables: {
      sort: query.sort,
      time: query.time,
      serverName: params?.server,
    },
    context: {
      headers: {
        cookie: req.headers.cookie,
      },
    },
  });

  return {
    props: {
      server: serverData?.server,
      initialPosts: postsData?.posts,
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
