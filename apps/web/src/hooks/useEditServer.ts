import { useStore } from "./useStore";

export const useEditServer = () =>
  useStore((s) => {
    return {
      editServerDialog: s.editServerDialog,
      setEditServerDialog: s.setEditServerDialog,
      editingServer: s.editingServer,
      setEditingServer: s.setEditingServer,
    };
  });
