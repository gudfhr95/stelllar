import create from "zustand";

interface Store {
  loginDialog: boolean;
  setLoginDialog: (open: boolean) => void;

  settingsDialog: boolean;
  setSettingsDialog: (open: boolean) => void;

  deleteAccountDialog: boolean;
  setDeleteAccountDialog: (open: boolean) => void;

  createServerDialog: boolean;
  setCreateServerDialog: (open: boolean) => void;
}

export const useStore = create<Store>()((set, get) => ({
  loginDialog: false,
  setLoginDialog: (open) => set({ loginDialog: open }),

  settingsDialog: false,
  setSettingsDialog: (open) => set({ settingsDialog: open }),

  deleteAccountDialog: false,
  setDeleteAccountDialog: (open) => set({ deleteAccountDialog: open }),

  createServerDialog: false,
  setCreateServerDialog: (open) => set({ createServerDialog: open }),
}));
