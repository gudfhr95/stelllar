import Tippy from "@tippyjs/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateServerDialog } from "../../hooks/useCreateServerDialog";
import { readURL } from "../../utils/readURL";
import StyledDialog from "../ui/dialog/StyledDialog";
import { IconCheck, IconEdit } from "../ui/icons/Icons";

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
    }
  });

  const [bannerSrc, setBannerSrc] = useState(null as any);

  const close = () => {
    setOpen(false);
  };

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
    </StyledDialog>
  );
}
