import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Head from "next/head";
import client from "../../../apollo-client";
import PostList from "../../../src/components/post/PostList";
import {
  PostsDocument,
  Server,
  ServerDocument,
} from "../../../src/graphql/hooks";
import ServerLayout from "../../../src/layouts/ServerLayout";

export default function ServerPage({
  server,
  initialPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const title = `${server.displayName} - Stelllar`;
  const url = `https://stelllar.co/planets/${server.name}`;

  return (
    <>
      <NextSeo
        title={title}
        description={server.description ?? undefined}
        canonical={url}
        openGraph={{
          type: "website",
          url,
          title,
          description: server.description ?? undefined,
          images: [
            {
              url: server.bannerUrl ?? "",
            },
          ],
        }}
      />
      <Head>
        <title>{title}</title>
      </Head>
      <ServerLayout server={server}>
        <PostList initialPosts={initialPosts} />
      </ServerLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  server: Server;
  initialPosts: [];
}> = async ({ req, params, query, locale }) => {
  try {
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

    const { data: postsData } = await client.query({
      query: PostsDocument,
      variables: {
        sort: query.sort,
        time: query.time,
        serverName: params?.planet,
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
