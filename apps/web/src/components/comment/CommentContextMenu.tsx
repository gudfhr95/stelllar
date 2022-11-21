import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDeleteCommentMutation } from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import ContextMenuSection from "../ui/context/ContextMenuSection";

export default function CommentContextMenu({
  comment,
  post,
  ContextMenuItem,
}: any) {
  const { t } = useTranslation("comment");
  const router = useRouter();
  const user = useAuth();

  const [deleteComment] = useDeleteCommentMutation();

  const onClickDelete = () => {
    deleteComment({
      variables: { input: comment.id },
    }).then(() => router.replace(router.asPath));
  };

  const canManageComment = user?.isAdmin || comment.author.id === user?.id;
  return (
    <>
      <ContextMenuSection>
        {canManageComment && (
          <>
            <ContextMenuItem label={t("menu.edit")} />
            <ContextMenuItem
              label={t("menu.delete")}
              red
              onClick={onClickDelete}
            />
          </>
        )}
      </ContextMenuSection>
    </>
  );
}
