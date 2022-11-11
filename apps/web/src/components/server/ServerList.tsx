import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import { IconCreateServer, IconExplore, IconHome } from "../ui/icons/Icons";
import ServerListItem from "./ServerListItem";

export default function ServerList({ hide = false }) {
  const { t } = useTranslation("server-list");
  const user = useAuth();

  const router = useRouter();

  const homeActive = router.pathname === "/";
  const exploreActive = router.pathname === "/explore";
  return (
    <>
      <div
        className={`${
          hide ? "hidden md:flex" : "flex"
        } h-full flex-col items-center min-w-[4.5rem] w-18 bg-gray-300 dark:bg-gray-900 overflow-y-auto scrollbar-none`}
      >
        <div className="h-full flex flex-col items-center w-full divide-y dark:divide-gray-800 divide-gray-200">
          <div className="space-y-2 flex flex-col items-center py-2">
            <ServerListItem
              name={t("home")}
              to="/"
              active={homeActive}
              className={`${
                homeActive
                  ? "bg-blue-600"
                  : "dark:bg-gray-800 bg-white hover:bg-blue-600 dark:hover:bg-blue-600"
              }`}
            >
              <IconHome />
            </ServerListItem>

            <ServerListItem
              name={t("explore")}
              to="/explore"
              active={exploreActive}
              className={
                exploreActive
                  ? "bg-green-600"
                  : "dark:bg-gray-800 bg-white hover:bg-green-600 dark:hover:bg-green-600"
              }
            >
              <IconExplore
                className={`w-5 h-5 group-hover:text-white transition ${
                  exploreActive ? "text-white" : "text-green-500"
                }`}
              />
            </ServerListItem>

            {user && (
              <ServerListItem
                name={t("createServer")}
                onClick={() => {}}
                className="dark:bg-gray-800 bg-white hover:bg-purple-600 dark:hover:bg-purple-600"
              >
                <IconCreateServer
                  className={`w-5 h-5 text-purple-500 group-hover:text-white transition`}
                />
              </ServerListItem>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
