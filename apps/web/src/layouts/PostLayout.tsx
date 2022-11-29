import { PropsWithChildren } from "react";
import ServerSettingDialog from "../components/dialog/ServerSettingDialog";
import HomeSidebar from "../components/home/HomeSidebar";
import PostHeader from "../components/post/PostHeader";
import ServerSidebar from "../components/server/ServerSidebar";
import { Post, Server } from "../graphql/hooks";

type ServerLayout = {
  server: Server;
  post: Post;
  previousRoute?: string | null;
};

export default function PostLayout({
  server,
  post,
  previousRoute = null,
  children,
}: PropsWithChildren<ServerLayout>) {
  const hasPreviousPath = previousRoute !== null;
  const previousIsServer =
    previousRoute === null || previousRoute.includes("planets");

  return (
    <>
      <ServerSettingDialog server={server} />

      {previousIsServer ? <ServerSidebar server={server} /> : <HomeSidebar />}

      <div className="flex flex-col flex-grow">
        <PostHeader post={post} back={hasPreviousPath} />
        <div className="h-full">
          <div className="max-h-full h-full scrollbar-custom dark:bg-gray-750 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
