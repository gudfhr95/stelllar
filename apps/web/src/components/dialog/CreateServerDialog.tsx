import Tippy from "@tippyjs/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ServerCategory } from "../../graphql/hooks";
import { useCreateServerDialog } from "../../hooks/useCreateServerDialog";
import { readURL } from "../../utils/readURL";
import CategorySelect from "../server/CategorySelect";
import StyledDialog from "../ui/dialog/StyledDialog";
import { IconCheck, IconEdit } from "../ui/icons/Icons";

const SERVER_REGEX = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

export default function CreateServerDialog() {
  const { t } = useTranslation("create-server");

  const { createServerDialog: open, setCreateServerDialog: setOpen } =
    useCreateServerDialog();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  watch((values, { name }) => {
    if (name === "bannerFile") {
      const { bannerFile } = values;
      if (!bannerFile || !bannerFile[0]) {
        return;
      }

      readURL(bannerFile[0]).then((url) => setBannerSrc(url));
    } else if (name === "avatarFile") {
      const { avatarFile } = values;
      if (!avatarFile || !avatarFile[0]) {
        return;
      }

      readURL(avatarFile[0]).then((url) => setAvatarSrc(url));
    }
  });
  const displayName = watch("displayName");

  const [bannerSrc, setBannerSrc] = useState(null as any);
  const [avatarSrc, setAvatarSrc] = useState(null as any);
  const [category, setCategory] = useState(ServerCategory.Other);

  const close = () => {
    setOpen(false);
  };

  const initials = (displayName || "")
    .split(" ")
    .map((s: string[]) => s[0])
    .join("")
    .toUpperCase();

  return (
    <StyledDialog
      isOpen={open}
      onClose={close}
      closeOnOverlayClick
      buttons={
        <Tippy content={t("save")}>
          <button type="submit" className={`form-button-submit`}>
            <IconCheck className="w-5 h-5 text-primary" />
          </button>
        </Tippy>
      }
    >
      <input
        type="file"
        {...register("bannerFile")}
        className="hidden"
        id="bannerFile"
        accept="image/png,image/jpeg,image/webp,image/gif"
      />

      <label
        htmlFor="bannerFile"
        className={`h-24 block relative rounded-t-lg group cursor-pointer bg-center bg-cover ${
          bannerSrc ? "" : "bg-gradient-to-br from-red-400 to-indigo-600"
        }`}
        style={bannerSrc ? { backgroundImage: `url(${bannerSrc})` } : {}}
      >
        <div className="rounded-t-lg absolute inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center">
          <IconEdit className="w-10 h-10" />
        </div>
      </label>

      <input
        type="file"
        {...register("avatarFile")}
        className="hidden"
        id="avatarFile"
        accept="image/png,image/jpeg,image/webp,image/gif"
      />

      <label
        htmlFor="avatarFile"
        className="flex items-center justify-center cursor-pointer rounded-3xl h-24 w-24 absolute left-3 top-24 transform -translate-y-1/2 dark:bg-gray-700 shadow group bg-center bg-cover bg-white"
        style={avatarSrc ? { backgroundImage: `url(${avatarSrc})` } : {}}
      >
        {!avatarSrc && (
          <div className="text-tertiary text-3xl font-medium overflow-hidden">
            {initials}
          </div>
        )}
        <div className="absolute rounded-3xl inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center">
          <IconEdit className="w-10 h-10" />
        </div>
      </label>

      <div className="pl-30 pr-5 pt-2 text-left">
        <input
          {...register("displayName", { maxLength: 100, required: true })}
          placeholder={t("displayName")}
          className="form-input-lg"
          maxLength={100}
        />
      </div>

      <div className="pb-5 space-y-3 pt-3 px-5 text-left">
        <div>
          <div className="text-sm text-accent flex items-center pt-3">
            <span className={`h-7 flex items-center`}>stelllar.co/+</span>
            <input
              {...register("name", {
                pattern: SERVER_REGEX,
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
              minLength={2}
              maxLength={20}
              placeholder={t("name")}
              className="bg-transparent h-7 w-full border-b dark:border-gray-700 focus:outline-none transition dark:focus:border-blue-500"
            />
          </div>
          {errors.name?.type === "pattern" && (
            <div className="form-error">{t("nameError")}</div>
          )}
        </div>

        <textarea
          {...register("description", { maxLength: 500 })}
          placeholder={t("description")}
          className="form-textarea"
          maxLength={500}
        />

        <div className="flex items-center">
          <div className="text-13 font-medium text-tertiary pr-1.5">
            {t("category.title")}
          </div>
          <CategorySelect category={category} setCategory={setCategory} />
        </div>
      </div>
    </StyledDialog>
  );
}
