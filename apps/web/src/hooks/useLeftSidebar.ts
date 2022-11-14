import { useStore } from "./useStore";

export const useLeftSidebar = () =>
  useStore((s) => {
    return {
      showLeftSidebar: s.showLeftSidebar,
      setShowLeftSidebar: s.setShowLeftSidebar,
    };
  });
