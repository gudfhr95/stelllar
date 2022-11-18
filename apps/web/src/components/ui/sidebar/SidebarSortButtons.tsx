import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { IconHot, IconNew, IconTop } from "../icons/Icons";
import SidebarItem from "./SidebarItem";

type SortItem = {
  sort: string;
  icon: any;
};

function SortItem({ sort, icon }: SortItem) {
  const { t } = useTranslation("server");
  const router = useRouter();
  const planet = router.query.planet;

  const active =
    router.query.sort === sort ||
    (sort === "Hot" &&
      !router.query.sort &&
      (router.asPath === `/planets/${planet}` || router.pathname === "/"));

  const Icon = icon;

  return (
    <SidebarItem
      to={{
        pathname:
          router.pathname === "/" ? "/" : `/planets/${router.query.planet}`,
        query: router.pathname === "/" ? { ...router.query, sort } : { sort },
      }}
      active={active}
    >
      <Icon className="w-5 h-5 mr-3 text-tertiary" />
      {t(`sidebar.${sort}`)}
    </SidebarItem>
  );
}

export default function SidebarSortButtons() {
  return (
    <div className="space-y-0.5">
      <SortItem sort={"Hot"} icon={IconHot} />
      <SortItem sort={"New"} icon={IconNew} />
      <SortItem sort={"Top"} icon={IconTop} />
    </div>
  );
}
