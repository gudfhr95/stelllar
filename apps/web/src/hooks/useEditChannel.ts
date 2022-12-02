import { useStore } from "./useStore";

export const useEditChannel = () =>
  useStore((s) => {
    return {
      editChannelDialog: s.editChannelDialog,
      setEditChannelDialog: s.setEditChannelDialog,
      editingChannel: s.editingChannel,
      setEditingChannel: s.setEditingChannel,
    };
  });
