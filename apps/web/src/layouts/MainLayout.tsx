import { PropsWithChildren } from "react";

import BottomBar from "../components/BottomBar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-grow">
      <div
        className="flex items-stretch"
        style={{ height: "calc(100% - 1.375rem)" }}
      >
        {children}
      </div>
      <BottomBar />
    </div>
  );
}
