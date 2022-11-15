import { useStore } from "./useStore";

export const useShowLeftSidebar = () =>
  useStore((s) => {
    return {
      showLeftSidebar: s.showLeftSidebar,
      setShowLeftSidebar: s.setShowLeftSidebar,
    };
  });
