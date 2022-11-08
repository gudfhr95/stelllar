import { useStore } from "./useStore";

export const useLoginDialog = () =>
  useStore((s) => {
    return {
      loginDialog: s.loginDialog,
      setLoginDialog: s.setLoginDialog,
      register: s.register,
      setRegister: s.setRegister,
    };
  });
