import { useStore } from "./useStore";

export const useServerSettingDialog = () =>
  useStore((s) => {
    return {
      serverSettingDialog: s.serverSettingDialog,
      setServerSettingDialog: s.setServerSettingDialog,
    };
  });
