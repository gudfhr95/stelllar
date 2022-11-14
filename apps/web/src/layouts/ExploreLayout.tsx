import { PropsWithChildren } from "react";
import ExploreSidebar from "../components/explore/ExploreSidebar";

type ExploreLayout = {};

export default function ExploreLayout({
  children,
}: PropsWithChildren<ExploreLayout>) {
  return (
    <>
      <ExploreSidebar />
      {children}
    </>
  );
}
