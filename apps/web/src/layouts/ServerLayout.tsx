import { PropsWithChildren } from "react";
import ServerSettingDialog from "../components/dialog/ServerSettingDialog";
import ServerSidebar from "../components/server/ServerSidebar";
import { Server } from "../graphql/hooks";

type ServerLayout = {
  server: Server;
};

export default function ServerLayout({
  server,
  children,
}: PropsWithChildren<ServerLayout>) {
  return (
    <>
      <ServerSettingDialog server={server} />
      <ServerSidebar server={server} />
      {children}
    </>
  );
}
