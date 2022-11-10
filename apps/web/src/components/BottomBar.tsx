import Tippy from "@tippyjs/react";
import { useTranslation } from "next-i18next";
import useAuth from "../hooks/useAuth";
import { useDarkMode } from "../hooks/useDarkMode";
import { useLoginDialog } from "../hooks/useLoginDialog";
import { IconDark, IconLight, IconSettings } from "./ui/icons/Icons";
import UserAvatar from "./user/UserAvatar";

const offset = [0, 14] as [number, number];

export default function BottomBar() {
  const { t } = useTranslation("bottom-bar");

  const { setLoginDialog } = useLoginDialog();
  const { toggle: toggleDark, value: isDark } = useDarkMode();

  const user = useAuth() as any;

  return (
    <>
      <div className="flex items-center shadow-md px-3 bottom-0 h-5.5 dark:bg-gray-700 z-50 bg-white">
        {user ? (
          <>
            <UserAvatar
              avatarUrl={user.image}
              isOnline={user.isOnline}
              size={4.5}
              className="mr-2"
            />
            <div className="text-primary text-13 font-medium cursor-pointer">
              {user.name}
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 ml-2" />
          </>
        ) : (
          <div className="flex items-center text-primary text-13 font-medium">
            <div
              className="cursor-pointer hover:underline"
              onClick={() => {
                setLoginDialog(true);
              }}
            >
              {t("login")}
            </div>
          </div>
        )}

        <div className="ml-auto flex items-center space-x-4 text-primary">
          <Tippy content={isDark ? t("theme.light") : t("theme.dark")}>
            <button
              className="text-tertiary cursor-pointer"
              onClick={() => toggleDark()}
            >
              {isDark ? (
                <IconLight className="w-5 h-5" />
              ) : (
                <IconDark className="w-5 h-5" />
              )}
            </button>
          </Tippy>
          {user && (
            <>
              <Tippy content={t("settings")} offset={offset}>
                <div onClick={() => {}}>
                  <IconSettings className="w-4.5 h-4.5 cursor-pointer text-tertiary" />
                </div>
              </Tippy>
            </>
          )}
        </div>
      </div>
    </>
  );
}
