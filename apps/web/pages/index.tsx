import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import client from "../apollo-client";
import PostList from "../src/components/post/PostList";
import { PostsDocument } from "../src/graphql/hooks";
import HomeLayout from "../src/layouts/HomeLayout";

export default function Index({
  initialPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <HomeLayout>
      <PostList initialPosts={initialPosts} />
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
