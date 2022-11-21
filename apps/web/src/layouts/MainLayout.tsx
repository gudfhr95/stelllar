import { PropsWithChildren } from "react";
import BottomBar from "../components/BottomBar";
import CreatePostDialog from "../components/dialog/CreatePostDialog";
import CreateServerDialog from "../components/dialog/CreateServerDialog";
import LoginDialog from "../components/dialog/LoginDialog";
import SettingsDialog from "../components/dialog/UserSettingDialog";
import ServerList from "../components/server/ServerList";
import ResponsiveToaster from "../components/ui/ResponsiveToaster";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ResponsiveToaster />
      <LoginDialog />
      <SettingsDialog />
      <CreateServerDialog />
      <CreatePostDialog />
      <div className="flex-grow">
        <div
          className="flex items-stretch"
          style={{ height: "calc(100% - 1.375rem)" }}
        >
          <ServerList hide />
          {children}
        </div>
        <BottomBar />
      </div>
    </>
  );
}
