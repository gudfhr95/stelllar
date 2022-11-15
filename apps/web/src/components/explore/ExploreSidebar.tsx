import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ServerCategory } from "../../graphql/hooks";
import { getCategoryIcon } from "../../utils/getCategoryIcon";
import { IconNew, IconTop } from "../ui/icons/Icons";
import Sidebar from "../ui/sidebar/Sidebar";
import SidebarItem from "../ui/sidebar/SidebarItem";
import SidebarLabel from "../ui/sidebar/SidebarLabel";
import { VectorLogo } from "../ui/vectors/VectorLogo";

type Category = {
  category: string | null;
};

function Category({ category }: Category) {
  const { t } = useTranslation("explore");
  const router = useRouter();

  const Icon = getCategoryIcon(category);
  return (
    <SidebarItem
      to={{
        pathname: router.pathname,
        query: { ...router.query, category },
      }}
      active={router.query.category === category}
    >
      <Icon className={`w-5 h-5 mr-3`} />
      {category ? t(`category.${category}`) : t("category.All")}
    </SidebarItem>
  );
}

type Sort = {
  sort: string;
  label: string;
  icon: any;
};

function Sort({ sort, label, icon }: Sort) {
  const router = useRouter();

  const Icon = icon;
  return (
    <SidebarItem
      to={{
        pathname: router.pathname,
        query: { ...router.query, sort },
      }}
      active={router.query.sort === sort}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </SidebarItem>
  );
}

export default function ExploreSidebar() {
  const { t } = useTranslation("explore");

  const categories = useMemo(() => {
    let c = Object.keys(ServerCategory);
    // Make 'Other' last
    const removed = c.splice(c.indexOf(ServerCategory.Other), 1);
    c.push(...removed);
    return c;
  }, []);

  return (
    <Sidebar>
      <div className="h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium">
        <VectorLogo className="h-10" />
      </div>
      <div className="px-1.5">
        <SidebarLabel>{t("sort.label")}</SidebarLabel>
        <div className="space-y-0.5">
          <Sort label={t("sort.top")} sort="Top" icon={IconTop} />
          <Sort label={t("sort.new")} sort="New" icon={IconNew} />
        </div>

        <SidebarLabel>{t("category.title")}</SidebarLabel>

        <div className="space-y-0.5">
          <Category category="All" />
          {categories.map((category) => (
            <Category key={category} category={category} />
          ))}
        </div>
      </div>
    </Sidebar>
  );
}
