import { useStore } from "./useStore";

export const useEditPostDialog = () =>
  useStore((s) => {
    return {
      editPostDialog: s.editPostDialog,
      setEditPostDialog: s.setEditPostDialog,
    };
  });
