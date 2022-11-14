import create from "zustand";

type Store = {
  loginDialog: boolean;
  setLoginDialog: (open: boolean) => void;

  userSettingDialog: boolean;
  setUserSettingDialog: (open: boolean) => void;

  deleteAccountDialog: boolean;
  setDeleteAccountDialog: (open: boolean) => void;

  createServerDialog: boolean;
  setCreateServerDialog: (open: boolean) => void;

  showLeftSidebar: boolean;
  setShowLeftSidebar: (show: boolean) => void;

  showRightSidebar: boolean;
  setShowRightSidebar: (show: boolean) => void;

  postSort: string;
  setPostSort: (sort: string) => void;

  serverSettingDialog: boolean;
  setServerSettingDialog: (open: boolean) => void;

  exploreSort: string;
  setExploreSort: (sort: string) => void;

  exploreCategory: string | null;
  setExploreCategory: (category: string | null) => void;
};

export const useStore = create<Store>()((set, get) => ({
  loginDialog: false,
  setLoginDialog: (open) => set({ loginDialog: open }),

  userSettingDialog: false,
  setUserSettingDialog: (open) => set({ userSettingDialog: open }),

  deleteAccountDialog: false,
  setDeleteAccountDialog: (open) => set({ deleteAccountDialog: open }),

  createServerDialog: false,
  setCreateServerDialog: (open) => set({ createServerDialog: open }),

  showLeftSidebar: false,
  setShowLeftSidebar: (show) => set({ showLeftSidebar: show }),

  showRightSidebar: false,
  setShowRightSidebar: (show) => set({ showRightSidebar: show }),

  postSort: "Hot",
  setPostSort: (sort) => set({ postSort: sort }),

  serverSettingDialog: false,
  setServerSettingDialog: (open) => set({ serverSettingDialog: open }),

  exploreSort: "Top",
  setExploreSort: (sort) => set({ exploreSort: sort }),

  exploreCategory: null,
  setExploreCategory: (category) => set({ exploreCategory: category }),
}));
