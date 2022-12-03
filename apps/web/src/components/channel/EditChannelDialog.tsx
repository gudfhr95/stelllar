import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Server,
  useCreateChannelMutation,
  useUpdateChannelMutation,
} from "../../graphql/hooks";
import { useEditChannel } from "../../hooks/useEditChannel";
import ServerAvatar from "../server/ServerAvatar";
import StyledDialog from "../ui/dialog/StyledDialog";
import { IconCheck, IconSpinner, IconX } from "../ui/icons/Icons";

type EditChannelDialog = {
  server: Server;
};

export default function EditChannelDialog({ server }: EditChannelDialog) {
  const { t } = useTranslation("channel");
  const router = useRouter();

  const {
    editChannelDialog: open,
    setEditChannelDialog: setOpen,
    editingChannel: channel,
  } = useEditChannel();

  const [createChannel, { loading: createChannelLoading }] =
    useCreateChannelMutation();
  const [updateChannel, { loading: updateChannelLoading }] =
    useUpdateChannelMutation();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const name = watch("name");

  useEffect(() => {
    if (channel) {
      setValue("name", channel.name);
      setValue("description", channel.description || "");
    }
  }, [channel]);

  const onSubmit = ({ name, description }: any) => {
    if (channel) {
      updateChannel({
        variables: { input: { channelId: channel.id, name, description } },
      })
        .then(({ data }) => {
          reset();
          close();
          router.replace(router.asPath);
        })
        .catch((data) => {
          setError("name", { type: data.message });
        });
    } else {
      createChannel({
        variables: { input: { name, description, serverId: server.id } },
      })
        .then(({ data }) => {
          reset();
          close();
          router.replace(router.asPath);
        })
        .catch((data) => {
          setError("name", { type: data.message });
        });
    }
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <StyledDialog
      isOpen={open}
      onClose={close}
      closeOnOverlayClick
      onSubmit={handleSubmit(onSubmit)}
      buttons={
        <button
          type="submit"
          className="form-button-submit"
          disabled={!name || createChannelLoading || updateChannelLoading}
        >
          {createChannelLoading || updateChannelLoading ? (
            <IconSpinner className="w-5 h-5" />
          ) : (
            <IconCheck className="w-5 h-5" />
          )}
        </button>
      }
    >
      <div className="p-5 space-y-4 w-full text-left">
        <div className="flex items-center font-semibold text-primary">
          <ServerAvatar
            name={server.name}
            displayName={server.displayName}
            avatarUrl={server.avatarUrl}
            size={6}
            className="rounded-md mr-2"
          />
          <div className="truncate">{server.displayName}</div>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          {t(`${channel ? "edit" : "create"}.label`)}
          <IconX
            className="h-5 w-5 highlightable ml-auto"
            onClick={() => close()}
          />
        </div>
        <div>
          <div className="relative">
            <input
              {...register("name", { required: true, maxLength: 100 })}
              id="name"
              maxLength={100}
              spellCheck={false}
              autoCapitalize="none"
              placeholder={t("create.name")}
              className="form-input"
            />
          </div>
          {!!name && errors.name?.type === "duplicateName" && (
            <div className="form-error">{t("create.error.duplicateName")}</div>
          )}
        </div>

        <textarea
          {...register("description")}
          placeholder={t("create.description")}
          className="form-textarea"
        />
      </div>
    </StyledDialog>
  );
}
