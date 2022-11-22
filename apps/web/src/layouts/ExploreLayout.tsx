import { useTranslation } from "next-i18next";
import { PropsWithChildren } from "react";
import ExploreSidebar from "../components/explore/ExploreSidebar";
import Header from "../components/ui/header/Header";
import { IconExplore } from "../components/ui/icons/Icons";

export default function ExploreLayout({ children }: PropsWithChildren) {
  const { t } = useTranslation("explore");

  return (
    <div className="flex flex-grow">
      <ExploreSidebar />
      <div className="flex flex-col flex-grow">
        <Header title={t("title")} icon={<IconExplore className="w-5 h-5" />} />
        <div className="h-full">
          <div className="max-h-full h-full dark:bg-gray-750 px-6 py-4 scrollbar-custom overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
