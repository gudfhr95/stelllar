import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import client from "../apollo-client";
import PostList from "../src/components/post/PostList";
import { PostsDocument } from "../src/graphql/hooks";
import HomeLayout from "../src/layouts/HomeLayout";

export default function Index({
  initialPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("home");

  return (
    <>
      <Head>
        <title>{`${t("title")} - Stelllar`}</title>
      </Head>
      <HomeLayout>
        <PostList initialPosts={initialPosts} />
      </HomeLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initialPosts: [];
}> = async ({ req, locale, query }) => {
  try {
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
  } catch (e: any) {
    const {
      graphQLErrors: [{ statusCode }],
    } = e;

    if (statusCode === 404) {
      return { notFound: true };
    }

    throw new Error();
  }
};
