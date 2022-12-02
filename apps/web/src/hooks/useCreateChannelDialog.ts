import { useStore } from "./useStore";

export const useCreateChannelDialog = () =>
  useStore((s) => {
    return {
      createChannelDialog: s.createChannelDialog,
      setCreateChannelDialog: s.setCreateChannelDialog,
    };
  });
