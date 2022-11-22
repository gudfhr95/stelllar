import { PropsWithChildren } from "react";
import ServerSettingDialog from "../components/dialog/ServerSettingDialog";
import ServerHeader from "../components/server/ServerHeader";
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
      <div className="flex flex-col flex-grow">
        <ServerHeader />
        <div className="h-full">{children}</div>
      </div>
    </>
  );
}
