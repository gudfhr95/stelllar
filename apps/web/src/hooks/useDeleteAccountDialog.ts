import { useStore } from "./useStore";

export const useDeleteAccountDialog = () =>
  useStore((s) => {
    return {
      deleteAccountDialog: s.deleteAccountDialog,
      setDeleteAccountDialog: s.setDeleteAccountDialog,
    };
  });
