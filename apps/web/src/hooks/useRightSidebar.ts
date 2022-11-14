import { useStore } from "./useStore";

export const useRightSidebar = () =>
  useStore((s) => {
    return {
      showRightSidebar: s.showRightSidebar,
      setShowRightSidebar: s.setShowRightSidebar,
    };
  });
