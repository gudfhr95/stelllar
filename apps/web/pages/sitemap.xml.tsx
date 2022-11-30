import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import client from "../apollo-client";
import { PublicServersDocument, Server } from "../src/graphql/hooks";

export default function Sitemap() {}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const siteUrl = "https://stelllar.co";
    const lastmod = new Date().toISOString();

    const pageFields: ISitemapField[] = [
      {
        loc: `${siteUrl}`,
        changefreq: "daily",
        priority: 0.7,
        lastmod,
      },
      {
        loc: `${siteUrl}/explore`,
        changefreq: "daily",
        priority: 0.7,
        lastmod,
      },
    ];

    const { data: serverData } = await client.query({
      query: PublicServersDocument,
    });

    const serverFields = serverData.publicServers.map((server: Server) => ({
      loc: `${siteUrl}/planets/${server.name}`,
      changefreq: "daily",
      priority: 0.7,
      lastmod,
    }));

    return getServerSideSitemap(ctx, [...pageFields, ...serverFields]);
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
