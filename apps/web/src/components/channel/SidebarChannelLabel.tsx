import { useTranslation } from "next-i18next";
import { Server } from "../../graphql/hooks";
import SidebarLabel from "../ui/sidebar/SidebarLabel";

type CreateChannel = {
  server: Server;
};

export default function SidebarChannelLabel({ server }: CreateChannel) {
  const { t } = useTranslation("channel");

  return (
    <>
      <SidebarLabel onClick={() => {}} plusLabel={t("create.label")}>
        {t("label")}
      </SidebarLabel>
    </>
  );
}
