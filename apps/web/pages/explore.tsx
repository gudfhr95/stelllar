import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ExploreLayout from "../src/layouts/ExploreLayout";

export default function Explore() {
  return <ExploreLayout></ExploreLayout>;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "bottom-bar",
        "settings",
        "server-list",
        "create-server",
        "explore",
      ])),
    },
  };
}
