import { useTranslation } from "next-i18next";
import { ChangeEvent } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useDeleteAccountDialog } from "../../hooks/useDeleteAccountDialog";
import { useSettingsDialog } from "../../hooks/useSettingsDialog";
import StyledDialog from "../ui/dialog/StyledDialog";
import {
  IconCheck,
  IconDelete,
  IconImage,
  IconSpinner,
  IconX,
} from "../ui/icons/Icons";
import UserAvatar from "../user/UserAvatar";

export default function UserSettingsDialog() {
  const { t } = useTranslation("settings");
  const user = useAuth();

  const { settingsDialog: open, setSettingsDialog: setOpen } =
    useSettingsDialog();
  const { setDeleteAccountDialog } = useDeleteAccountDialog();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const name = watch("name");

  const [updateAvatar] = useUpdateAvatarMutation();
  const [updateProfile, { loading: updateProfileLoading }] =
    useUpdateProfileMutation();

  const close = () => {
    reset();
    setOpen(false);
  };

  const onChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const avatarFile = event.target.files;
    if (!avatarFile) {
      return;
    }

    updateAvatar({ variables: { input: { avatarFile: avatarFile[0] } } }).then(
      () => {
        toast.success("Changed Avatar");
      }
    );
  };

  const onSubmit: SubmitHandler<FieldValues> = ({ name }) => {
    updateProfile({ variables: { input: { name } } }).then(() => {
      toast.success("Changed Profile");
    });
  };

  const onClickDeleteAccountButton = () => {
    setDeleteAccountDialog(true);
  };

  return (
    <>
      {user && (
        <StyledDialog
          isOpen={open}
          onClose={close}
          closeOnOverlayClick
          buttons={
            <button
              disabled={updateProfileLoading || !name || name.length < 2}
              className="form-button-submit"
            >
              {t("confirm")}
              {updateProfileLoading ? (
                <IconSpinner className="w-5 h-5" />
              ) : (
                <IconCheck className="ml-2 w-5 h-5" />
              )}
            </button>
          }
          onSubmit={handleSubmit(onSubmit)}
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

            <div className="border dark:border-gray-750 rounded space-y-3 p-3">
              <div className="text-xs font-medium text-tertiary">
                {t("changeProfile")}
              </div>
              <div>
                <div className="relative">
                  <input
                    className="form-input-password"
                    placeholder={t("name")}
                    id="name"
                    {...register("name", {
                      minLength: 2,
                      value: user?.name,
                    })}
                    minLength={2}
                  />
                  {!!name && errors.name && (
                    <div className="form-error">{t("error.nameLength")}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={onClickDeleteAccountButton}
                className="form-button-delete"
              >
                {t("deleteAccount.title")}
                <IconDelete className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </StyledDialog>
      )}
    </>
  );
}
