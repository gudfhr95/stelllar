import Tippy from "@tippyjs/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ServerCategory,
  useCreateServerMutation,
  useUpdateServerMutation,
} from "../../graphql/hooks";
import { useEditServer } from "../../hooks/useEditServer";
import { readURL } from "../../utils/readURL";
import StyledDialog from "../ui/dialog/StyledDialog";
import {
  IconEdit,
  IconSpinner,
  IconUserToServerArrow,
} from "../ui/icons/Icons";
import CategorySelect from "./CategorySelect";

const SERVER_REGEX = /^[a-z|A-Z|0-9|\-]+$/;

export default function EditServerDialog() {
  const { t } = useTranslation("server");
  const router = useRouter();

  const {
    editServerDialog: open,
    setEditServerDialog: setOpen,
    editingServer: server,
  } = useEditServer();

  const [createServer, { loading: createServerLoading }] =
    useCreateServerMutation();
  const [updateServer, { loading: updateServerLoading }] =
    useUpdateServerMutation();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  watch((values, { name }) => {
    if (name === "bannerFile") {
      const { bannerFile } = values;
      if (!bannerFile || !bannerFile[0]) {
        return;
      }

      readURL(bannerFile[0]).then((url) => setBannerSrc(url as string));
    } else if (name === "avatarFile") {
      const { avatarFile } = values;
      if (!avatarFile || !avatarFile[0]) {
        return;
      }

      readURL(avatarFile[0]).then((url) => setAvatarSrc(url as string));
    }
  });
  const name = watch("name");
  const displayName = watch("displayName");
  const [bannerSrc, setBannerSrc] = useState<any>(null);
  const [avatarSrc, setAvatarSrc] = useState<any>(null);
  const [category, setCategory] = useState(
    server?.category ?? ServerCategory.Other
  );

  useEffect(() => {
    resetInputs();

    if (server) {
      setBannerSrc(server.bannerUrl);
      setAvatarSrc(server.avatarUrl);
      setValue("name", server.name);
      setValue("displayName", server.displayName);
      setValue("description", server.description);
      setCategory(server.category);
    }
  }, [server]);

  const resetInputs = () => {
    setBannerSrc(null);
    setAvatarSrc(null);
    setCategory(ServerCategory.Other);
    reset();
  };

  const onSubmit = ({
    displayName,
    description,
    avatarFile,
    bannerFile,
  }: any) => {
    if (server) {
      updateServer({
        variables: {
          input: {
            serverId: server.id,
            displayName,
            description,
            category,
            avatarFile: avatarFile ? avatarFile[0] : null,
            bannerFile: bannerFile ? bannerFile[0] : null,
          },
        },
      }).then(() => {
        resetInputs();
        setOpen(false);
        router.push(router.asPath);
      });
    } else {
      createServer({
        variables: {
          input: {
            name,
            displayName,
            description,
            category,
            avatarFile: avatarFile ? avatarFile[0] : null,
            bannerFile: bannerFile ? bannerFile[0] : null,
          },
        },
      })
        .then(({ data }) => {
          resetInputs();
          close();
          router.push(`/planets/${data!.createServer.name}`);
        })
        .catch((data) => {
          setError("name", { type: data.message });
        });
    }
  };

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
      onSubmit={handleSubmit(onSubmit)}
      buttons={
        <Tippy content={t("save")}>
          <button
            type="submit"
            disabled={
              !displayName ||
              !name ||
              displayName?.length < 2 ||
              name?.length < 2 ||
              createServerLoading ||
              updateServerLoading ||
              !SERVER_REGEX.test(name)
            }
            className="form-button-submit"
          >
            {createServerLoading || updateServerLoading ? (
              <IconSpinner className="w-5 h-5 text-primary" />
            ) : (
              <IconUserToServerArrow className="w-5 h-5 text-primary" />
            )}
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
          placeholder={t("edit.displayName")}
          className="form-input-lg"
          maxLength={100}
        />
      </div>

      <div className="pb-5 space-y-3 pt-3 px-5 text-left">
        <div>
          <div className="text-sm text-accent flex items-center pt-3">
            <span className={`h-7 flex items-center`}>
              stelllar.co/planets/
            </span>
            {server ? (
              <span>{`${server.name}`}</span>
            ) : (
              <input
                {...register("name", {
                  pattern: SERVER_REGEX,
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
                minLength={2}
                maxLength={20}
                placeholder={t("edit.name")}
                className="form-input"
              />
            )}
          </div>
          {!!name && errors.name?.type === "pattern" && (
            <div className="form-error">{t("edit.error.namePattern")}</div>
          )}
          {!!name && errors.name?.type === "duplicateName" && (
            <div className="form-error">{t("edit.error.duplicateName")}</div>
          )}
        </div>

        <textarea
          {...register("description", { maxLength: 500 })}
          placeholder={t("edit.description")}
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
