import ctl from "@netlify/classnames-template-literals";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { useShowLeftSidebar } from "../../../hooks/useShowLeftSidebar";
import { useShowRightSidebar } from "../../../hooks/useShowRightSidebar";
import ServerList from "../../server/ServerList";

const sidebarClass = ctl(`
  transition
  md:transition-none
  fixed
  md:relative
  md:translate-x-0
  top-0
  bottom-0
  bg-gray-200
  dark:bg-gray-800
  transform
  z-50
  md:z-0
`);

const leftClass = (show: boolean) =>
  ctl(`
  left-0
  md:rounded-tl-lg
  ${show ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  flex
  md:w-60
  md:min-w-[15rem]
  w-78
  min-w-[19.5rem]
`);

const rightClass = (show: boolean) =>
  ctl(`
  right-0
  ${show ? "translate-x-0" : "translate-x-full"}
  ${show ? "md:block" : "md:hidden"}
  w-60
  min-w-[15rem]
`);

const overlayClass = ctl(`
  bg-black
  bg-opacity-75
  md:hidden
  fixed
  inset-0
  z-40
`);

type Sidebar = {
  right?: boolean;
};

export default function Sidebar({
  right = false,
  children,
}: PropsWithChildren<Sidebar>) {
  const { showLeftSidebar, setShowLeftSidebar } = useShowLeftSidebar();
  const { showRightSidebar, setShowRightSidebar } = useShowRightSidebar();

  return (
    <>
      <AnimatePresence>
        {(right ? showRightSidebar : showLeftSidebar) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className={overlayClass}
            onClick={() => {
              if (right && showRightSidebar) setShowRightSidebar(false);
              else if (!right && showLeftSidebar) setShowLeftSidebar(false);
            }}
          />
        )}
      </AnimatePresence>

      <div
        className={`${sidebarClass} ${
          right ? rightClass(showRightSidebar) : leftClass(showLeftSidebar)
        }`}
      >
        {!right && (
          <div
            className={`md:hidden`}
            onClick={() => setShowLeftSidebar(false)}
          >
            <ServerList />
          </div>
        )}
        <div
          className="relative h-full w-full scrollbar-dark overflow-y-auto"
          onClick={() => {
            if (!right) setShowLeftSidebar(false);
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
