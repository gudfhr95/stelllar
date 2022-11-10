import { useTranslation } from "next-i18next";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useUpdateAvatarMutation } from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useSettingsDialog } from "../../hooks/useSettingsDialog";
import StyledDialog from "../ui/dialog/StyledDialog";
import { IconCheck, IconImage, IconX } from "../ui/icons/Icons";
import UserAvatar from "../user/UserAvatar";

export default function UserSettingsDialog() {
  const { t } = useTranslation("settings");

  const user = useAuth();
  const { settingsDialog: open, setSettingsDialog: setOpen } =
    useSettingsDialog();

  const [updateAvatar] = useUpdateAvatarMutation();

  const close = () => {
    setOpen(false);
  };
  const onChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const avatarFile = event.target.files;
    if (!avatarFile) {
      return;
    }

    updateAvatar({ variables: { input: { avatarFile: avatarFile[0] } } }).then(
      (result) => {
        console.log(result);
        toast.success("changed avatar");
      }
    );
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
            <div className="flex items-center font-semibold text-primary">
              <UserAvatar
                avatarUrl={user.image}
                size={6}
                className="rounded-md mr-2"
              />
              {t("title")}&nbsp;&nbsp;–&nbsp;&nbsp;
              <div className="truncate">{user.name}</div>
              <IconX
                className="h-5 w-5 highlightable ml-auto"
                onClick={close}
              />
            </div>

            <div className="py-5 flex items-center">
              <UserAvatar avatarUrl={user.image} size={20} />
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                name="avatarFile"
                id="avatarFile"
                hidden
                onChange={onChangeAvatar}
              />
              <label
                htmlFor="avatarFile"
                className="h-9 transition hover:bg-gray-200 cursor-pointer flex items-center justify-center text-sm font-medium border rounded dark:border-gray-600 px-3 bg-gray-300 text-gray-800 ml-3"
              >
                <IconImage className="w-5 h-5 mr-2" />
                {t("uploadAvatar")}
              </label>
            </div>
          </div>
        </StyledDialog>
      )}
    </>
  );
}
