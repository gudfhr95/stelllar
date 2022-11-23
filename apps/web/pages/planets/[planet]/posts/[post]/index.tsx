import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Head from "next/head";
import client from "../../../../../apollo-client";
import Post from "../../../../../src/components/post/Post";
import {
  Comment,
  CommentsDocument,
  Post as PostType,
  PostDocument,
  Server,
  ServerDocument,
} from "../../../../../src/graphql/hooks";
import PostLayout from "../../../../../src/layouts/PostLayout";

export default function PostPage({
  server,
  post,
  comments,
  previousPath,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const title = `${post.title} - ${server.displayName}`;
  const description = `${post.title} ${post.text}`;
  const url = `https://stelllar.co/planets/${server.name}/posts/${post.id}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: "website",
          url,
          title,
          description: description,
          images: [
            {
              url: post.images ? post.images[0].image.originalUrl : "",
            },
          ],
        }}
      />
      <Head>
        <title>{title}</title>
      </Head>
      <PostLayout server={server} post={post} previousPath={previousPath}>
        <Post post={post} comments={comments} />
      </PostLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  server: Server;
  post: PostType;
  comments: Comment[];
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

  const { data: commentsData } = await client.query({
    query: CommentsDocument,
    variables: {
      postId: params?.post,
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
      comments: commentsData?.comments ?? [],
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
