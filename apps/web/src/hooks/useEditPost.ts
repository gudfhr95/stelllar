import { useStore } from "./useStore";

export const useEditPost = () =>
  useStore((s) => {
    return {
      editPostDialog: s.editPostDialog,
      setEditPostDialog: s.setEditPostDialog,
      editingPost: s.editingPost,
      setEditingPost: s.setEditingPost,
    };
  });
