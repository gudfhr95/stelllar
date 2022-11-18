import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import { IconFeatured, IconHome } from "../ui/icons/Icons";
import Sidebar from "../ui/sidebar/Sidebar";
import SidebarItem from "../ui/sidebar/SidebarItem";
import SidebarLabel from "../ui/sidebar/SidebarLabel";
import SidebarSortButtons from "../ui/sidebar/SidebarSortButtons";
import { VectorLogo } from "../ui/vectors/VectorLogo";

export default function HomeSidebar() {
  const { t } = useTranslation("home");
  const router = useRouter();
  const user = useAuth();

  const feedActive =
    router.pathname === "/" &&
    (router.query.feed === "Joined" || (user && !router.query.feed));
  const featuredActive =
    router.pathname === "/" &&
    (router.query.feed === "Featured" || (!user && !router.query.feed));

  return (
    <>
      <Sidebar>
        <div className="h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium">
          <VectorLogo className="h-10" />
        </div>

        <div className="px-1.5">
          <SidebarLabel>{t("feed.label")}</SidebarLabel>

          <div className="space-y-0.5">
            {!!user && (
              <SidebarItem
                to={{
                  pathname: "/",
                  query: router.query.sort
                    ? { sort: router.query.sort, feed: "Joined" }
                    : { feed: "Joined" },
                }}
                active={feedActive}
              >
                <IconHome className="mr-3 h-5 w-5" />
                {t("feed.feed")}
              </SidebarItem>
            )}

            <SidebarItem
              to={{
                pathname: "/",
                query: router.query.sort
                  ? { sort: router.query.sort, feed: "Featured" }
                  : { feed: "Featured" },
              }}
              active={featuredActive}
            >
              <IconFeatured className="mr-3 h-5 w-5" />
              {t("feed.featured")}
            </SidebarItem>
          </div>

          <SidebarLabel>{t("post.label")}</SidebarLabel>
          <SidebarSortButtons />
        </div>
      </Sidebar>
    </>
  );
}
