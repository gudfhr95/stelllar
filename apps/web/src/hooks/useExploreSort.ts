import { useStore } from "./useStore";

export const useExploreSort = () =>
  useStore((s) => {
    return {
      exploreSort: s.exploreSort,
      setExploreSort: s.setExploreSort,
    };
  });
