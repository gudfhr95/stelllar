import { useTranslation } from "next-i18next";
import { useCreateChannelDialog } from "../../hooks/useCreateChannelDialog";
import SidebarLabel from "../ui/sidebar/SidebarLabel";

export default function SidebarChannelLabel() {
  const { t } = useTranslation("channel");

  const { setCreateChannelDialog } = useCreateChannelDialog();

  return (
    <>
      <SidebarLabel
        onClick={() => {
          setCreateChannelDialog(true);
        }}
        plusLabel={t("create.label")}
      >
        {t("label")}
      </SidebarLabel>
    </>
  );
}
