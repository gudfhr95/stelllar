import { PropsWithChildren } from "react";
import HomeSidebar from "../components/home/HomeSidebar";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-grow">
      <HomeSidebar />
      {children}
    </div>
  );
}
