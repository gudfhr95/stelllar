import { PropsWithChildren } from "react";

import ServerList from "../components/server/ServerList";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-grow">
      <div
        className="flex items-stretch"
        style={{ height: "calc(100% - 1.375rem)" }}
      >
        <ServerList hide />
        {children}
      </div>
    </div>
  );
}
