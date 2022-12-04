import Tippy from "@tippyjs/react";
import { useTranslation } from "next-i18next";
import { Channel, Server } from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useEditChannel } from "../../hooks/useEditChannel";
import { IconChannel, IconSettings } from "../ui/icons/Icons";
import SidebarItem from "../ui/sidebar/SidebarItem";

type SidebarChannel = {
  server: Server;
  channel: Channel;
};

export default function SidebarChannel({ server, channel }: SidebarChannel) {
  const { t } = useTranslation("channel");
  const user = useAuth();

  const { setEditChannelDialog, setEditingChannel } = useEditChannel();

  const canManageChannel = !!user && !!server && user.id === server.owner.id;
  return (
    <>
      <SidebarItem>
        <IconChannel className={`w-5 h-5 mr-3 text-tertiary`} />
        <span>{channel.name}</span>

        <div className="ml-auto" />

        {canManageChannel && (
          <Tippy content={t("edit.label")}>
            <div
              className="group-hover:block hidden"
              onClick={(e) => {
                e.stopPropagation();
                setEditingChannel(channel);
                setEditChannelDialog(true);
              }}
            >
              <IconSettings className="w-4 h-4 text-tertiary" />
            </div>
          </Tippy>
        )}
      </SidebarItem>
    </>
  );
}
