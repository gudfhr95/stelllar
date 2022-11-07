import { PropsWithChildren } from "react";
import BottomBar from "../components/BottomBar";
import LoginDialog from "../components/LoginDialog";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LoginDialog />
      <div className="flex-grow">
        <div className="flex items-stretch" style={{ height: "100%" }}>
          {children}
        </div>
        <BottomBar />
      </div>
    </>
  );
}
