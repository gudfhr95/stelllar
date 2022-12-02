import ctl from "@netlify/classnames-template-literals";
import { useTranslation } from "next-i18next";
import { Server } from "../../graphql/hooks";
import { useCreateChannelDialog } from "../../hooks/useCreateChannelDialog";
import ServerAvatar from "../server/ServerAvatar";
import StyledDialog from "../ui/dialog/StyledDialog";
import { IconCheck, IconX } from "../ui/icons/Icons";

const dotClass = (enabled: boolean) =>
  ctl(`
  h-1.5
  w-1.5
  rounded-full
  dark:bg-gray-100
  mr-2
  ${enabled ? "opacity-100" : "opacity-0"}
`);

const typeClass = (enabled: boolean) =>
  ctl(`
  flex
  items-center
  cursor-pointer
  ${
    enabled
      ? "text-primary"
      : "text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
  }
`);

type CreateChannelDialog = {
  server: Server;
};

export default function CreateChannelDialog({ server }: CreateChannelDialog) {
  const { t } = useTranslation("channel");

  const { createChannelDialog: open, setCreateChannelDialog: setOpen } =
    useCreateChannelDialog();

  const close = () => {
    setOpen(false);
  };

  return (
    <StyledDialog
      isOpen={open}
      onClose={close}
      closeOnOverlayClick
      buttons={
        <button type="submit" className="form-button-submit" disabled={true}>
          <IconCheck className="w-5 h-5" />
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
              id="name"
              maxLength={100}
              spellCheck={false}
              autoCapitalize="none"
              placeholder={t("create.name")}
              className="form-input"
            />
          </div>
        </div>

        <textarea
          placeholder={t("create.description")}
          className="form-textarea"
        />
      </div>
    </StyledDialog>
  );
}
