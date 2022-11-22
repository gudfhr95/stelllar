import { useStore } from "./useStore";

export const useShowRightSidebar = () =>
  useStore((s) => {
    return {
      showRightSidebar: s.showRightSidebar,
      setShowRightSidebar: s.setShowRightSidebar,
    };
  });
