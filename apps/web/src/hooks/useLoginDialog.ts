import { useStore } from "./useStore";

export const useLoginDialog = () =>
  useStore((s) => {
    return {
      loginDialog: s.loginDialog,
      setLoginDialog: s.setLoginDialog,
      createAccount: s.createAccount,
      setCreateAccount: s.setCreateAccount,
    };
  });
