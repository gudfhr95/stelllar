import { useStore } from "./useStore";

export const useCreateServerDialog = () =>
  useStore((s) => {
    return {
      createServerDialog: s.createServerDialog,
      setCreateServerDialog: s.setCreateServerDialog,
    };
  });
