import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Index() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login-dialog", "bottom-bar"])),
    },
  };
}
