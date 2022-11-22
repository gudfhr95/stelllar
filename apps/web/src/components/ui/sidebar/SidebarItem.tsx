import ctl from "@netlify/classnames-template-literals";
import Link from "next/link";
import { ForwardedRef, forwardRef, PropsWithChildren } from "react";

const className = (large: boolean, small: boolean, light: boolean) =>
  ctl(`
  ${large && "h-11"}
  ${small && "h-9"}
  ${!large && !small && "h-9"}
  group
  rounded
  cursor-pointer
  flex
  items-center
  text-base
  font-medium
  px-4
  w-full
  ${
    light
      ? "dark:hover:bg-gray-725 dark:active:bg-gray-725 hover:bg-gray-300 active:bg-gray-300"
      : "dark:hover:bg-gray-775 dark:active:bg-gray-775 hover:bg-gray-300 active:bg-gray-300"
  }
  text-gray-600
  dark:text-gray-400
  select-none
  focus:outline-none
  relative
  hover:text-gray-700
  dark:hover:text-gray-300
`);

const activeClassName = (light: boolean) =>
  ctl(`
  text-gray-800
  hover:text-gray-800
  dark:text-gray-200
  dark:hover:text-gray-200
  ${
    light
      ? `dark:bg-gray-700 dark:hover:bg-gray-700 bg-gray-300`
      : `dark:bg-gray-750 dark:hover:bg-gray-750 bg-gray-300`
  }
`);

type SidebarItem = {
  to?: string | {};
  active?: boolean;
  onClick?: () => void;
  small?: boolean;
  large?: boolean;
  light?: boolean;
  exact?: boolean;
};
const SidebarItem = forwardRef(
  (
    {
      to,
      onClick,
      active,
      small = false,
      large = false,
      light = false,
      exact = false,
      children,
    }: PropsWithChildren<SidebarItem>,
    ref: ForwardedRef<any>
  ) => {
    if (to)
      return (
        <Link
          href={to}
          ref={ref}
          className={`${className(large, small, light)} ${
            active ? activeClassName(light) : ""
          }`}
        >
          {children}
        </Link>
      );

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`${className(large, small, light)} ${
          active ? activeClassName(light) : ""
        }`}
        type="button"
      >
        {children}
      </button>
    );
  }
);

SidebarItem.displayName = "SidebarItem";
export default SidebarItem;
