import { useStore } from "./useStore";

export const useCreatePostDialog = () =>
  useStore((s) => {
    return {
      createPostDialog: s.createPostDialog,
      setCreatePostDialog: s.setCreatePostDialog,
    };
  });
