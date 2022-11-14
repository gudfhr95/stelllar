import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { usePostSort } from "../../../hooks/usePostSort";
import { IconHot, IconNew, IconTop } from "../icons/Icons";
import SidebarItem from "./SidebarItem";

type SortItem = {
  name: string;
  icon: any;
};

function SortItem({ name, icon }: SortItem) {
  const router = useRouter();
  const server = router.query.server;

  const { postSort, setPostSort } = usePostSort();

  const active =
    postSort === name &&
    (router.asPath === "/" || router.asPath === `/server/${server}`);

  const Icon = icon;

  return (
    <SidebarItem
      active={active}
      onClick={() => {
        setPostSort(name);
        router.replace(server ? `/server/${server}` : "/");
      }}
    >
      <Icon className="w-5 h-5 mr-3 text-tertiary" />
      {name}
    </SidebarItem>
  );
}

export default function SidebarSortButtons() {
  const { t } = useTranslation("server");
  return (
    <div className="space-y-0.5">
      <SortItem name={t("sidebar.hot")} icon={IconHot} />
      <SortItem name={t("sidebar.new")} icon={IconNew} />
      <SortItem name={t("sidebar.top")} icon={IconTop} />
    </div>
  );
}
