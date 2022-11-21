import { useTranslation } from "next-i18next";
import useAuth from "../../hooks/useAuth";
import ContextMenuSection from "../ui/context/ContextMenuSection";

export default function CommentContextMenu({
  comment,
  post,
  ContextMenuItem,
}: any) {
  const { t } = useTranslation("comment");
  const user = useAuth();

  const canManageComment = user?.isAdmin || comment.author.id === user?.id;
  return (
    <>
      <ContextMenuSection>
        {canManageComment && (
          <>
            <ContextMenuItem label={t("menu.edit")} />
            <ContextMenuItem label={t("menu.delete")} red onClick={() => {}} />
          </>
        )}
      </ContextMenuSection>
    </>
  );
}
