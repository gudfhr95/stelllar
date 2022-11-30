import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

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

    return getServerSideSitemap(ctx, [...pageFields]);
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
