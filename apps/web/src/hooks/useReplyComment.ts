import { useStore } from "./useStore";

export const useReplyComment = () =>
  useStore((s) => {
    return {
      replyingCommentId: s.replyingCommentId,
      setReplyingCommentId: s.setReplyingCommentId,
    };
  });
