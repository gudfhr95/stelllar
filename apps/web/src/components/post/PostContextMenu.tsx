import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCopyToClipboard } from "react-use";
import useAuth from "../../hooks/useAuth";
import ContextMenuSection from "../ui/context/ContextMenuSection";

export default function PostContextMenu({ post, ContextMenuItem }: any) {
  const { t } = useTranslation("post");
  const router = useRouter();
  const user = useAuth();

  const copyToClipboard = useCopyToClipboard()[1];

  const canManagePost = user?.isAdmin || post.author.id === user?.id;

  if (!post) return null;
  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem
          onClick={() => {
            copyToClipboard(`${location.origin}${router.asPath}`);
          }}
          label={t("menu.copyLink")}
        />{" "}
        {canManagePost && (
          <>
            <ContextMenuItem label={t("menu.edit")} />
            <ContextMenuItem red label={t("menu.delete")} />
          </>
        )}
      </ContextMenuSection>
    </>
  );
}
