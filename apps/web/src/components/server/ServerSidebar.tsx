import ctl from "@netlify/classnames-template-literals";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  Server,
  useJoinServerMutation,
  useLeaveServerMutation,
} from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useServerSettingDialog } from "../../hooks/useServerSettingDialog";
import { getCategoryIcon } from "../../utils/getCategoryIcon";
import SidebarChannelLabel from "../channel/SidebarChannelLabel";
import {
  IconPost,
  IconSettings,
  IconSpinner,
  IconUsers,
} from "../ui/icons/Icons";
import Sidebar from "../ui/sidebar/Sidebar";
import SidebarItem from "../ui/sidebar/SidebarItem";
import SidebarLabel from "../ui/sidebar/SidebarLabel";
import SidebarSortButtons from "../ui/sidebar/SidebarSortButtons";
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
  const { t } = useTranslation("server");
  const router = useRouter();
  const user = useAuth();

  const { setServerSettingDialog: setOpen } = useServerSettingDialog();

  const [joinServer, { loading: joinServerLoading }] = useJoinServerMutation();
  const [leaveServer, { loading: leaveServerLoading }] =
    useLeaveServerMutation();

  const CategoryIcon = getCategoryIcon(server.category);

  const onClickJoinButton = () => {
    if (server.isJoined) {
      leaveServer({ variables: { serverId: server.id } }).then(() =>
        router.replace(router.asPath)
      );
    } else {
      joinServer({
        variables: { serverId: server.id },
      }).then(() => router.replace(router.asPath));
    }
  };

  return (
    <>
      <Sidebar>
        {server.bannerUrl ? (
          <div
            className="w-full h-20 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${server.bannerUrl})` }}
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

              {!!user && !!server && user.id !== server.owner.id && (
                <button
                  className={joinButtonClass(
                    server.isJoined,
                    joinServerLoading || leaveServerLoading
                  )}
                  type="button"
                  disabled={joinServerLoading || leaveServerLoading}
                  onClick={onClickJoinButton}
                >
                  {joinServerLoading || leaveServerLoading ? (
                    <IconSpinner className="w-3 h-3" />
                  ) : server.isJoined ? (
                    t("sidebar.leave")
                  ) : (
                    t("sidebar.join")
                  )}
                </button>
              )}
            </div>

            <div className="text-13 text-secondary pb-1.5">
              {server.description || "No description"}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs font-medium flex items-center text-tertiary">
                <IconUsers className="w-4 h-4 mr-2.5" />
                {server.userCount}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs font-medium flex items-center text-tertiary">
                <IconPost className="w-4 h-4 mr-2.5" />
                {server.postCount}
              </div>
              <div className="text-xs font-medium flex items-center text-tertiary">
                <CategoryIcon className="w-4 h-4 mr-2.5" />
                {t(`category.${server.category}`)}
              </div>
            </div>
          </div>

          <SidebarLabel plusLabel="Create Post">
            {t("sidebar.posts")}
          </SidebarLabel>

          <SidebarSortButtons />

          <SidebarChannelLabel server={server} />

          {!!user && !!server && user.id === server.owner.id && (
            <>
              <SidebarLabel>{t("sidebar.admin")}</SidebarLabel>
              <div className="space-y-0.5">
                <SidebarItem onClick={() => setOpen(true)}>
                  <IconSettings className="mr-3 w-5 h-5" />
                  {t("sidebar.edit")}
                </SidebarItem>
              </div>
            </>
          )}
        </div>
      </Sidebar>
    </>
  );
}
