import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import astronaut from "../public/images/astronaut.png";

export default function NotFoundPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>404 - Stelllar</title>
      </Head>
      <div className="w-full h-full flex flex-col items-center justify-center text-primary bg-gray-750">
        <img
          alt="astronaut"
          src={astronaut.src}
          className="w-64 h-64 wobject-contain opacity-50 animate-float select-none pointer-events-none"
        />
        <div className="text-tertiary pt-10 text-2xl font-semibold">
          {t("404")}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
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
