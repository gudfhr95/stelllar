import { useTranslation } from "next-i18next";

export default function BottomBar() {
  const { t } = useTranslation("bottom-bar");

  return (
    <>
      <div className="flex items-center shadow-md px-3 bottom-0 h-5.5 dark:bg-gray-700 z-50 bg-white">
        <div className="flex items-center text-primary text-13 font-medium">
          <div className="cursor-pointer hover:underline" onClick={() => {}}>
            {t("login")}
          </div>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          <div className="cursor-pointer hover:underline" onClick={() => {}}>
            {t("createAccount")}
          </div>
        </div>
      </div>
    </>
  );
}
