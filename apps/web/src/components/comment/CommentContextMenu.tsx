import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useDeleteCommentMutation } from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useEditComment } from "../../hooks/useEditComment";
import { useReplyComment } from "../../hooks/useReplyComment";
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

  const { editingCommentId, setEditingCommentId } = useEditComment();
  const { setReplyingCommentId } = useReplyComment();

  const isEditing = editingCommentId === comment.id;
  const onClickEdit = () => {
    if (isEditing) {
      setEditingCommentId(null);
      setReplyingCommentId(null);
    } else {
      setEditingCommentId(comment.id);
      setReplyingCommentId(null);
    }
  };

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
            <ContextMenuItem label={t("menu.edit")} onClick={onClickEdit} />
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
