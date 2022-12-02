import { Channel } from "../../graphql/hooks";
import { IconChannel } from "../ui/icons/Icons";
import SidebarItem from "../ui/sidebar/SidebarItem";

type SidebarChannel = {
  channel: Channel;
};

export default function SidebarChannel({ channel }: SidebarChannel) {
  return (
    <>
      <SidebarItem>
        <IconChannel className={`w-5 h-5 mr-3 text-tertiary`} />
        <span>{channel.name}</span>
      </SidebarItem>
    </>
  );
}
