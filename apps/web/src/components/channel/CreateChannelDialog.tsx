import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { Server, useCreateChannelMutation } from "../../graphql/hooks";
import { useCreateChannelDialog } from "../../hooks/useCreateChannelDialog";
import ServerAvatar from "../server/ServerAvatar";
import StyledDialog from "../ui/dialog/StyledDialog";
import { IconCheck, IconSpinner, IconX } from "../ui/icons/Icons";

type CreateChannelDialog = {
  server: Server;
};

export default function CreateChannelDialog({ server }: CreateChannelDialog) {
  const { t } = useTranslation("channel");

  const { createChannelDialog: open, setCreateChannelDialog: setOpen } =
    useCreateChannelDialog();

  const [createChannel, { loading }] = useCreateChannelMutation();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const name = watch("name");

  const onSubmit = ({ name, description }: any) => {
    createChannel({
      variables: { input: { name, description, serverId: server.id } },
    })
      .then(({ data }) => {
        reset();
        close();
      })
      .catch((data) => {
        setError("name", { type: data.message });
      });
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
          disabled={!name || loading}
        >
          {loading ? (
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
          &nbsp;&nbsp;&middot;&nbsp;&nbsp; {t("create.label")}
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
