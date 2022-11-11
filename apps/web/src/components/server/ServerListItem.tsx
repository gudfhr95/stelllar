import ctl from "@netlify/classnames-template-literals";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { ForwardedRef, forwardRef, PropsWithChildren } from "react";

const dotClass = (active: boolean) =>
  ctl(`
  w-12
  h-12
  object-cover
  inline-flex
  items-center
  justify-center
  hover:rounded-2xl
  ${active ? "rounded-2xl" : "rounded-3xl"}
  transform
  transition-all
  relative
  group
  cursor-pointer
`);

const highlightClass = (active: boolean, unread: boolean) =>
  ctl(`
  absolute
  left-0
  w-1
  dark:bg-white
  bg-gray-900
  rounded-r-2xl
  top-1/2
  -translate-y-1/2
  transform
  transition
  duration-250
  group-hover:-translate-x-3
  ${
    active
      ? "-translate-x-3 h-10"
      : unread
      ? "-translate-x-3 h-2.5 group-hover:h-5"
      : "-translate-x-4 h-5"
  }
`);

interface ServerListItem {
  name: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  unread?: boolean;
}

const ServerListItem = forwardRef(
  (
    {
      name,
      to,
      onClick,
      className = "dark:bg-gray-800 bg-gray-200",
      active = false,
      unread = false,
      children,
    }: PropsWithChildren<ServerListItem>,
    ref: ForwardedRef<Element>
  ) => {
    return (
      <Tippy content={name} placement="right" ref={ref} offset={[0, 22]}>
        {to ? (
          <Link href={to} className={`${dotClass(active)} ${className}`}>
            <div className={highlightClass(active, unread)} />
            {children}
          </Link>
        ) : (
          <div onClick={onClick} className={`${dotClass(active)} ${className}`}>
            <div className={highlightClass(active, unread)} />
            {children}
          </div>
        )}
      </Tippy>
    );
  }
);

ServerListItem.displayName = "ServerListItem";
export default ServerListItem;
