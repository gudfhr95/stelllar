import { useStore } from "./useStore";

export const useExploreCategory = () =>
  useStore((s) => {
    return {
      exploreCategory: s.exploreCategory,
      setExploreCategory: s.setExploreCategory,
    };
  });
