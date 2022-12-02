import create from "zustand";
import { Channel, Post } from "../graphql/hooks";

type Store = {
  loginDialog: boolean;
  setLoginDialog: (open: boolean) => void;

  userSettingDialog: boolean;
  setUserSettingDialog: (open: boolean) => void;

  createServerDialog: boolean;
  setCreateServerDialog: (open: boolean) => void;

  showLeftSidebar: boolean;
  setShowLeftSidebar: (show: boolean) => void;

  showRightSidebar: boolean;
  setShowRightSidebar: (show: boolean) => void;

  serverSettingDialog: boolean;
  setServerSettingDialog: (open: boolean) => void;

  editPostDialog: boolean;
  setEditPostDialog: (open: boolean) => void;
  editingPost: Post | null;
  setEditingPost: (post: Post | null) => void;

  replyingCommentId: string | null;
  setReplyingCommentId: (commentId: string | null) => void;

  editingCommentId: string | null;
  setEditingCommentId: (commentId: string | null) => void;

  editChannelDialog: boolean;
  setEditChannelDialog: (open: boolean) => void;
  editingChannel: Channel | null;
  setEditingChannel: (channel: Channel | null) => void;
};

export const useStore = create<Store>()((set, get) => ({
  loginDialog: false,
  setLoginDialog: (open) => set({ loginDialog: open }),

  userSettingDialog: false,
  setUserSettingDialog: (open) => set({ userSettingDialog: open }),

  createServerDialog: false,
  setCreateServerDialog: (open) => set({ createServerDialog: open }),

  showLeftSidebar: false,
  setShowLeftSidebar: (show) => set({ showLeftSidebar: show }),

  showRightSidebar: false,
  setShowRightSidebar: (show) => set({ showRightSidebar: show }),

  serverSettingDialog: false,
  setServerSettingDialog: (open) => set({ serverSettingDialog: open }),

  editPostDialog: false,
  setEditPostDialog: (open) => set({ editPostDialog: open }),
  editingPost: null,
  setEditingPost: (post) => set({ editingPost: post }),

  replyingCommentId: null,
  setReplyingCommentId: (commentId) => set({ replyingCommentId: commentId }),

  editingCommentId: null,
  setEditingCommentId: (commentId) => set({ editingCommentId: commentId }),

  editChannelDialog: false,
  setEditChannelDialog: (open) => set({ editChannelDialog: open }),
  editingChannel: null,
  setEditingChannel: (channel) => set({ editingChannel: channel }),
}));
