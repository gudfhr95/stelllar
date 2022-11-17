import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import client from "../apollo-client";
import CreatePostHeader from "../src/components/post/CreatePostHeader";
import PostList from "../src/components/post/PostList";
import { PostsDocument } from "../src/graphql/hooks";
import useAuth from "../src/hooks/useAuth";
import HomeLayout from "../src/layouts/HomeLayout";

export default function Index({
  initialPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const user = useAuth();

  return (
    <HomeLayout>
      <PostList
        header={!!user ? <CreatePostHeader /> : <div className="h-4" />}
        initialPosts={initialPosts}
      />
    </HomeLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initialPosts: [];
}> = async ({ req, locale, query }) => {
  const { data } = await client.query({
    query: PostsDocument,
    variables: {
      sort: query.sort,
      time: query.time,
      feed: query.feed,
    },
    context: {
      headers: {
        cookie: req.headers.cookie,
      },
    },
  });

  return {
    props: {
      initialPosts: data.posts,
      ...(await serverSideTranslations(locale as string, [
        "bottom-bar",
        "settings",
        "server-list",
        "create-server",
        "explore",
        "server",
        "home",
        "post",
      ])),
    },
  };
};
