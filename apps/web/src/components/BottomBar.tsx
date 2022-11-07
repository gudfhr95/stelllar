import Tippy from "@tippyjs/react";
import { useTranslation } from "next-i18next";
import { useDarkMode } from "../hooks/useDarkMode";
import { useLoginDialog } from "../hooks/useLoginDialog";
import { IconDark, IconLight } from "./ui/icons/Icons";

export default function BottomBar() {
  const { t } = useTranslation("bottom-bar");

  const { setLoginDialog, setCreateAccount } = useLoginDialog();
  const { toggle: toggleDark, value: isDark } = useDarkMode();

  return (
    <>
      <div className="flex items-center shadow-md px-3 bottom-0 h-5.5 dark:bg-gray-700 z-50 bg-white">
        <div className="flex items-center text-primary text-13 font-medium">
          <div
            className="cursor-pointer hover:underline"
            onClick={() => {
              setLoginDialog(true);
              setCreateAccount(false);
            }}
          >
            {t("login")}
          </div>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          <div
            className="cursor-pointer hover:underline"
            onClick={() => {
              setLoginDialog(true);
              setCreateAccount(true);
            }}
          >
            {t("createAccount")}
          </div>
        </div>

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
        </div>
      </div>
    </>
  );
}
