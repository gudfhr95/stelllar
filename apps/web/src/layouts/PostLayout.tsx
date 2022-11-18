import { PropsWithChildren } from "react";
import ServerSettingDialog from "../components/dialog/ServerSettingDialog";
import HomeSidebar from "../components/home/HomeSidebar";
import PostHeader from "../components/post/PostHeader";
import ServerSidebar from "../components/server/ServerSidebar";
import { Post, Server } from "../graphql/hooks";

type ServerLayout = {
  server: Server;
  post: Post;
  previousPath?: string | null;
};

export default function PostLayout({
  server,
  post,
  previousPath = null,
  children,
}: PropsWithChildren<ServerLayout>) {
  const hasPreviousPath = previousPath !== null;
  const previousIsServer =
    previousPath === null || previousPath.includes("planets");

  return (
    <>
      <ServerSettingDialog server={server} />
      {previousIsServer ? <ServerSidebar server={server} /> : <HomeSidebar />}
      <div className="flex flex-col flex-grow">
        <PostHeader post={post} back={hasPreviousPath} />
        <div className="h-full">{children}</div>
      </div>
    </>
  );
}
