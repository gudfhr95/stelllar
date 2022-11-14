import { useTranslation } from "next-i18next";
import { PropsWithChildren } from "react";
import ExploreSidebar from "../components/explore/ExploreSidebar";
import Header from "../components/ui/header/Header";
import { IconExplore } from "../components/ui/icons/Icons";

type ExploreLayout = {};

export default function ExploreLayout({
  children,
}: PropsWithChildren<ExploreLayout>) {
  const { t } = useTranslation("explore");

  return (
    <div className="flex flex-grow">
      <ExploreSidebar />
      <div className="flex flex-col flex-grow">
        <Header title={t("title")} icon={<IconExplore className="w-5 h-5" />} />
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
