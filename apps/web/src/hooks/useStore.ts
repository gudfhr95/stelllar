import create from "zustand";

interface Store {
  loginDialog: boolean;
  setLoginDialog: (open: boolean) => void;

  createAccount: boolean;
  setCreateAccount: (createAccount: boolean) => void;
}

export const useStore = create<Store>()((set, get) => ({
  loginDialog: false,
  setLoginDialog: (open: boolean) => set({ loginDialog: open }),

  createAccount: false,
  setCreateAccount: (createAccount) => set({ createAccount }),
}));
