import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCopyToClipboard } from "react-use";
import { useDeletePostMutation } from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useEditPostDialog } from "../../hooks/useEditPostDialog";
import ContextMenuSection from "../ui/context/ContextMenuSection";

export default function PostContextMenu({ post, ContextMenuItem }: any) {
  const { t } = useTranslation("post");
  const router = useRouter();
  const user = useAuth();

  const [deletePost] = useDeletePostMutation();

  const copyToClipboard = useCopyToClipboard()[1];
  const { setEditPostDialog } = useEditPostDialog();

  const canManagePost = user?.isAdmin || post.author.id === user?.id;

  const onClickEdit = () => {
    setEditPostDialog(true);
  };

  const onClickDelete = () => {
    deletePost({
      variables: { input: post.id },
    }).then(() => router.replace(`/planets/${post.server.name}`));
  };

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
