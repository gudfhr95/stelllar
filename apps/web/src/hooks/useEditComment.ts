import { useStore } from "./useStore";

export const useEditComment = () =>
  useStore((s) => {
    return {
      editingCommentId: s.editingCommentId,
      setEditingCommentId: s.setEditingCommentId,
    };
  });
