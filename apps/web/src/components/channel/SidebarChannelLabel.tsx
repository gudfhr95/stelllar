import { useTranslation } from "next-i18next";
import { useEditChannel } from "../../hooks/useEditChannel";
import SidebarLabel from "../ui/sidebar/SidebarLabel";

export default function SidebarChannelLabel() {
  const { t } = useTranslation("channel");

  const { setEditChannelDialog, setEditingChannel } = useEditChannel();

  return (
    <>
      <SidebarLabel
        onClick={() => {
          setEditChannelDialog(true);
          setEditingChannel(null);
        }}
        plusLabel={t("create.label")}
      >
        {t("label")}
      </SidebarLabel>
    </>
  );
}
