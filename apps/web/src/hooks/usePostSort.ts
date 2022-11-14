import { useStore } from "./useStore";

export const usePostSort = () =>
  useStore((s) => {
    return {
      postSort: s.postSort,
      setPostSort: s.setPostSort,
    };
  });
