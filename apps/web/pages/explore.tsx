import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import client from "../apollo-client";
import ServerInfoCard from "../src/components/server/ServerInfoCard";
import EndReached from "../src/components/ui/EndReached";
import { PublicServersDocument, Server } from "../src/graphql/hooks";
import ExploreLayout from "../src/layouts/ExploreLayout";

export default function Explore({
  servers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation("explore");

  return (
    <>
      <Head>
        <title>{`${t("title")} - Stelllar`}</title>
      </Head>
      <ExploreLayout>
        <div className="md:px-8 md:py-8 px-0 py-0">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5">
            {servers.map((server) => (
              <ServerInfoCard
                key={server.id}
                name={server.name}
                displayName={server.displayName}
                description={server.description}
                avatarUrl={server.avatarUrl}
                bannerUrl={server.bannerUrl}
                userCount={server.userCount}
                postCount={server.postCount}
                category={server.category}
              />
            ))}
          </div>
          {!servers.length && <EndReached>{t("notFound")}</EndReached>}
        </div>
      </ExploreLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  servers: Server[];
}> = async ({ req, locale, query }) => {
  const { data } = await client.query({
    query: PublicServersDocument,
    variables: {
      sort: query.sort ?? null,
      category:
        query.category && query.category !== "All" ? query.category : null,
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
      servers: data.publicServers ?? [],
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
