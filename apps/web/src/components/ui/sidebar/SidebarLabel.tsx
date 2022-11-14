import ctl from "@netlify/classnames-template-literals";
import Tippy from "@tippyjs/react";
import { PropsWithChildren } from "react";
import { IconPlus } from "../icons/Icons";

const className = (showPlus: boolean) =>
  ctl(`
  px-3
  pt-4
  pb-1
  text-gray-500
  dark:text-gray-500
  uppercase
  text-11
  font-semibold
  tracking-wide
  flex
  items-center
  justify-between
  select-none
  ${showPlus && `hover:text-gray-600 dark:hover:text-gray-400`}
`);

type SidebarLabel = {
  plusLabel?: string;
  onClick?: () => void;
};

export default function SidebarLabel({
  plusLabel,
  onClick,
  children,
}: PropsWithChildren<SidebarLabel>) {
  const showPlus = !!plusLabel && !!onClick;

  return (
    <div className={className(showPlus)}>
      {children}
      {showPlus && (
        <Tippy content={plusLabel}>
          <div onClick={onClick}>
            <IconPlus className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" />
          </div>
        </Tippy>
      )}
    </div>
  );
}
