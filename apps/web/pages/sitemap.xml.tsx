import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export default function Sitemap() {}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const lastmod = new Date().toISOString();

  try {
    const pageFields: ISitemapField[] = [
      {
        loc: "https://stellar.co/",
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
