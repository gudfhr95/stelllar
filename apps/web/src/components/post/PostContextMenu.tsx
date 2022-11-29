import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "react-use";
import { useDeletePostMutation } from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useEditPostDialog } from "../../hooks/useEditPostDialog";
import ContextMenuSection from "../ui/context/ContextMenuSection";
import EditPostDialog from "./EditPostDialog";

export default function PostContextMenu({ post, ContextMenuItem }: any) {
  const { t } = useTranslation("post");
  const router = useRouter();
  const user = useAuth();

  const [deletePost] = useDeletePostMutation();

  const copyToClipboard = useCopyToClipboard()[1];

  const { setEditPostDialog } = useEditPostDialog();

  const onClickCopyLink = () => {
    copyToClipboard(
      `${location.origin}/planets/${post.server.name}/posts/${post.id}`
    );
    toast.success(t("menu.copyLink.success"));
  };

  const onClickEdit = () => {
    setEditPostDialog(true);
  };

  const onClickDelete = () => {
    deletePost({
      variables: { input: post.id },
    }).then(() => router.replace(`/planets/${post.server.name}`));
  };

  const canManagePost = user?.isAdmin || post.author.id === user?.id;
  return (
    <>
      <EditPostDialog post={post} />

      <ContextMenuSection>
        <ContextMenuItem
          onClick={onClickCopyLink}
          label={t("menu.copyLink.label")}
        />

        {canManagePost && (
          <>
            <ContextMenuItem label={t("menu.edit")} onClick={onClickEdit} />
            <ContextMenuItem
              red
              label={t("menu.delete")}
              onClick={onClickDelete}
            />
          </>
        )}
      </ContextMenuSection>
    </>
  );
}
