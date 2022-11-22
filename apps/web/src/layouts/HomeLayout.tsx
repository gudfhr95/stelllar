import { PropsWithChildren } from "react";
import HomeHeader from "../components/home/HomeHeader";
import HomeSidebar from "../components/home/HomeSidebar";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-grow">
      <HomeSidebar />
      <div className="flex flex-col flex-grow">
        <HomeHeader />
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
