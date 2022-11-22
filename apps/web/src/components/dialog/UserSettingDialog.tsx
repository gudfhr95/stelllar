import { useTranslation } from "next-i18next";
import { ChangeEvent } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useUserSettingDialog } from "../../hooks/useUserSettingDialog";
import StyledDialog from "../ui/dialog/StyledDialog";
import { IconCheck, IconImage, IconSpinner, IconX } from "../ui/icons/Icons";
import UserAvatar from "../user/UserAvatar";

export default function UserSettingsDialog() {
  const { t } = useTranslation("common");
  const user = useAuth();

  const { userSettingDialog: open, setUserSettingDialog: setOpen } =
    useUserSettingDialog();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
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
        toast.success(t("userSetting.toast.success"));
      }
    );
  };

  const onSubmit: SubmitHandler<FieldValues> = ({ name }) => {
    updateProfile({ variables: { input: { name } } })
      .then((data) => {
        toast.success(t("userSetting.toast.success"));
      })
      .catch((data) => {
        setError("name", { type: data.message });
      });
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
              {t("userSetting.confirm")}
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
              {t("userSetting.title")}
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
                {t("userSetting.uploadAvatar")}
              </label>
            </div>

            <div className="border dark:border-gray-750 rounded space-y-3 p-3">
              <div className="text-xs font-medium text-tertiary">
                {t("userSetting.name")}
              </div>
              <div>
                <div className="relative">
                  <input
                    className="form-input-password"
                    placeholder={t("userSetting.name")}
                    id="name"
                    {...register("name", {
                      minLength: 2,
                      value: user?.name,
                    })}
                    minLength={2}
                  />
                  {!!name && errors.name?.type === "minLength" && (
                    <div className="form-error">
                      {t("userSetting.error.nameLength")}
                    </div>
                  )}
                  {!!name && errors.name?.type === "duplicateName" && (
                    <div className="form-error">
                      {t("userSetting.error.duplicateName")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </StyledDialog>
      )}
    </>
  );
}
