import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

type HeaderTab = {
  to: string | {};
  time: string;
  green?: boolean;
};

export default function HeaderTab({
  to,
  time,
  green = false,
  children,
}: PropsWithChildren<HeaderTab>) {
  const router = useRouter();

  return (
    <Link
      href={to}
      className={`text-base font-medium rounded px-1.5 py-0.5 cursor-pointer select-none flex flex-shrink-0 items-center focus:outline-none ${
        time === router.query.time
          ? !green
            ? "text-secondary dark:bg-gray-700 bg-gray-200"
            : "text-green-600 bg-green-900"
          : !green
          ? "text-tertiary"
          : "text-secondary bg-green-600"
      }`}
    >
      {children}
    </Link>
  );
}
