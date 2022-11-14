import ctl from "@netlify/classnames-template-literals";
import { useTranslation } from "next-i18next";
import { Server } from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { getCategoryIcon } from "../../utils/getCategoryIcon";
import { IconUsers } from "../ui/icons/Icons";
import Sidebar from "../ui/sidebar/Sidebar";
import { VectorLogo } from "../ui/vectors/VectorLogo";
import ServerAvatar from "./ServerAvatar";

const joinButtonClass = (isJoined: boolean, loading: boolean) =>
  ctl(`
  ml-auto
  px-3
  h-6
  rounded
  text-13
  font-medium
  focus:outline-none
  ${
    isJoined
      ? "border border-gray-700 text-blue-500"
      : "bg-blue-500 text-primary"
  }
  ${loading ? "opacity-50" : "opacity-100"}
`);

type ServerSidebar = {
  server: Server;
};

export default function ServerSidebar({ server }: ServerSidebar) {
  console.log(server);

  const { t } = useTranslation("server");
  const user = useAuth();

  const CategoryIcon = getCategoryIcon(server.category);

  return (
    <>
      <Sidebar>
        {server.bannerUrl ? (
          <div
            className={`h-20 relative bg-center bg-cover bg-no-repeat ${
              server.bannerUrl
                ? ""
                : "bg-gradient-to-br from-red-400 to-indigo-600"
            }`}
            style={
              server.bannerUrl
                ? { backgroundImage: `url(${server.bannerUrl})` }
                : {}
            }
          />
        ) : (
          <div className="h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium">
            <VectorLogo className="h-10" />
          </div>
        )}

        <div className="px-1.5 pt-4">
          <div className="shadow-inner dark:bg-gray-850 bg-gray-300 p-2.5 space-y-2.5 rounded">
            <div className="flex items-center">
              <ServerAvatar
                name={server.name}
                displayName={server.displayName}
                avatarUrl={server.avatarUrl}
                size={6}
                className="rounded-md mr-2 dark:bg-gray-750"
              />
              <div className="font-semibold text-primary pr-2.5 truncate">
                {server.displayName}
              </div>
            </div>

            <div className="text-13 text-secondary pb-1.5">
              {server.description || "No description"}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs font-medium flex items-center text-tertiary">
                <IconUsers className="w-4 h-4 mr-2.5" />
                {server.userCount}
              </div>
              <div className="text-xs font-medium flex items-center text-tertiary">
                <CategoryIcon className="w-4 h-4 mr-2.5" />
                {t(`category.${server.category}`)}
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
