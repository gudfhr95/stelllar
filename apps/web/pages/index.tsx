import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HomeLayout from "../src/layouts/HomeLayout";

export default function Index() {
  return <HomeLayout></HomeLayout>;
}

export const getServerSideProps: GetServerSideProps<{}> = async ({
  req,
  locale,
  query,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "bottom-bar",
        "settings",
        "server-list",
        "create-server",
        "explore",
        "server",
        "home",
      ])),
    },
  };
};
