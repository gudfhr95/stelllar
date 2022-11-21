import Tippy from "@tippyjs/react";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import useAuth from "../hooks/useAuth";
import { useDarkMode } from "../hooks/useDarkMode";
import { useLoginDialog } from "../hooks/useLoginDialog";
import { useUserSettingDialog } from "../hooks/useUserSettingDialog";
import { IconDark, IconGithub, IconLight, IconLogout } from "./ui/icons/Icons";
import UserAvatar from "./user/UserAvatar";

const offset = [0, 14] as [number, number];

export default function BottomBar() {
  const { t } = useTranslation("common");
  const user = useAuth();

  const { setLoginDialog } = useLoginDialog();
  const { toggle: toggleDark, value: isDark } = useDarkMode();
  const { setUserSettingDialog } = useUserSettingDialog();

  const onClickGithub = () => {
    window.open("https://github.com/gudfhr95/stelllar");
  };

  return (
    <>
      <div className="relative flex items-center shadow-md px-3 bottom-0 h-5.5 dark:bg-gray-700 z-10 bg-white">
        {user ? (
          <>
            <div
              onClick={() => {
                setUserSettingDialog(true);
              }}
              className="flex items-center"
            >
              <UserAvatar avatarUrl={user.image} size={4.5} className="mr-2" />
              <div className="text-primary text-13 font-medium cursor-pointer">
                {user.name}
              </div>
            </div>

            <Tippy content={t("bottomBar.logout")}>
              <div onClick={() => signOut()}>
                <IconLogout className="w-4.5 h-4.5 cursor-pointer text-tertiary ml-5" />
              </div>
            </Tippy>
          </>
        ) : (
          <div className="flex items-center text-primary text-13 font-medium">
            <div
              className="cursor-pointer hover:underline"
              onClick={() => {
                setLoginDialog(true);
              }}
            >
              {t("bottomBar.login")}
            </div>
          </div>
        )}

        <div className="ml-auto flex items-center space-x-4 text-primary">
          <Tippy content="Github">
            <button
              className="text-tertiary cursor-pointer"
              onClick={onClickGithub}
            >
              <IconGithub className="w-4 h-4" />
            </button>
          </Tippy>

          <Tippy
            content={
              isDark ? t("bottomBar.theme.light") : t("bottomBar.theme.dark")
            }
          >
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
        </div>
      </div>
    </>
  );
}
