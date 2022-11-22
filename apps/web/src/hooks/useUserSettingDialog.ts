import { useStore } from "./useStore";

export const useUserSettingDialog = () =>
  useStore((s) => {
    return {
      userSettingDialog: s.userSettingDialog,
      setUserSettingDialog: s.setUserSettingDialog,
    };
  });
