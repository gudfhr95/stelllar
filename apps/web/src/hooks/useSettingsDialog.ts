import { useStore } from "./useStore";

export const useSettingsDialog = () =>
  useStore((s) => {
    return {
      settingsDialog: s.settingsDialog,
      setSettingsDialog: s.setSettingsDialog,
    };
  });
