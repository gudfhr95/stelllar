import { useTranslation } from "next-i18next";
import useAuth from "../../hooks/useAuth";
import { useSettingsDialog } from "../../hooks/useSettingsDialog";
import StyledDialog from "../ui/dialog/StyledDialog";
import { IconCheck } from "../ui/icons/Icons";

export default function UserSettingsDialog() {
  const { t } = useTranslation("settings");

  const user = useAuth();
  const { settingsDialog: open, setSettingsDialog: setOpen } =
    useSettingsDialog();

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      {user && (
        <StyledDialog
          isOpen={open}
          onClose={close}
          closeOnOverlayClick
          buttons={
            <div className="flex items-center shadow-md px-3 bottom-0 h-5.5 dark:bg-gray-700 z-50 bg-white">
              <button onClick={() => close()} className="form-button-submit">
                {t("confirm")}
                <IconCheck className="ml-2 w-5 h-5" />
              </button>
            </div>
          }
        >
          <div className="px-5 pt-5 pb-10">
            <div className="flex items-center font-semibold text-primary"></div>
          </div>
        </StyledDialog>
      )}
    </>
  );
}
