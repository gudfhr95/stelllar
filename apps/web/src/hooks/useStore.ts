import create from "zustand";

interface Store {
  loginDialog: boolean;
  setLoginDialog: (open: boolean) => void;

  register: boolean;
  setRegister: (register: boolean) => void;
}

export const useStore = create<Store>()((set, get) => ({
  loginDialog: false,
  setLoginDialog: (open: boolean) => set({ loginDialog: open }),

  register: false,
  setRegister: (register) => set({ register: register }),
}));
