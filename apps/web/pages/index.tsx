import { BottomBar } from "ui/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Index() {
  return (
    <div className="flex-grow">
      <div
        className="flex items-stretch"
        style={{ height: "calc(100% - 1.375rem)" }}
      >
        <BottomBar />
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth"])),
    },
  };
}
