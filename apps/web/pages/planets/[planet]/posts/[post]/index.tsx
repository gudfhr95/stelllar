import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import client from "../../../../../apollo-client";
import Post from "../../../../../src/components/post/Post";
import {
  Post as PostType,
  PostDocument,
  Server,
  ServerDocument,
} from "../../../../../src/graphql/hooks";
import PostLayout from "../../../../../src/layouts/PostLayout";

export default function PostPage({
  server,
  post,
  previousPath,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PostLayout server={server} post={post} previousPath={previousPath}>
      <Post post={post} />
    </PostLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  server: Server;
  post: PostType;
  previousPath?: string;
}> = async ({ req, params, query, locale }) => {
  const { data: serverData } = await client.query({
    query: ServerDocument,
    variables: {
      name: params?.planet,
    },
    fetchPolicy: "no-cache",
    context: {
      headers: {
        cookie: req.headers.cookie,
      },
    },
  });

  const { data: postData } = await client.query({
    query: PostDocument,
    variables: {
      id: params?.post,
    },
    fetchPolicy: "no-cache",
    context: {
      headers: {
        cookie: req.headers.cookie,
      },
    },
  });

  return {
    props: {
      server: serverData?.server,
      post: postData?.post,
      ...(await serverSideTranslations(locale as string, [
        "common",
        "home",
        "explore",
        "server",
        "post",
        "comment",
      ])),
    },
  };
};
