import { PropsWithChildren } from "react";
import BottomBar from "../components/BottomBar";
import CreateServerDialog from "../components/dialog/CreateServerDialog";
import DeleteAccountDialog from "../components/dialog/DeleteAccountDialog";
import LoginDialog from "../components/dialog/LoginDialog";
import SettingsDialog from "../components/dialog/SettingsDialog";
import ServerList from "../components/server/ServerList";
import ResponsiveToaster from "../components/ui/ResponsiveToaster";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ResponsiveToaster />
      <LoginDialog />
      <SettingsDialog />
      <DeleteAccountDialog />
      <CreateServerDialog />
      <div className="flex-grow">
        <div className="flex items-stretch" style={{ height: "100%" }}>
          <ServerList hide />
          {children}
        </div>
        <BottomBar />
      </div>
    </>
  );
}
