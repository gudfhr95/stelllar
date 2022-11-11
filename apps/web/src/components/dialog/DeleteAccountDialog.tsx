import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useDeleteAccountMutation } from "../../graphql/hooks";
import { useDeleteAccountDialog } from "../../hooks/useDeleteAccountDialog";
import Dialog from "../ui/dialog/Dialog";
import { IconSpinner } from "../ui/icons/IconSpinner";

export default function DeleteAccountDialog() {
  const { t } = useTranslation("settings");

  const { deleteAccountDialog: open, setDeleteAccountDialog: setOpen } =
    useDeleteAccountDialog();

  const [deleteAccount, { loading }] = useDeleteAccountMutation();

  const [confirmText, setConfirmText] = useState("");

  const onClose = () => {
    setOpen(false);
  };

  const onClickConfirm = () => {
    deleteAccount().then(() => {
      signOut();
      setOpen(false);
    });
  };

  return (
    <Dialog isOpen={open} onClose={onClose}>
      <div className="max-w-md w-full rounded-md bg-white dark:bg-gray-800 shadow-lg p-4">
        <div className="text-red-400 text-2xl font-semibold">
          {t("deleteAccount.title")}
        </div>

        <div className="text-secondary pb-5 pt-3 text-base">
          {t("deleteAccount.content")}
        </div>

        <div className="text-left">
          <input
            id="confirm"
            name="confirm"
            className="textbox"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            className="form-button-cancel"
            type="button"
            onClick={() => setOpen(false)}
          >
            {t("deleteAccount.cancel")}
          </button>
          <button
            className="form-button-delete"
            type="button"
            disabled={loading || !confirmText || confirmText !== "Confirm"}
            onClick={onClickConfirm}
          >
            {loading ? (
              <IconSpinner className="w-5 h-5 text-primary ml-3" />
            ) : (
              t("deleteAccount.confirm")
            )}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
