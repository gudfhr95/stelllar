import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePreviousRoute = () => {
  const { asPath } = useRouter();

  const [history, setHistory] = useState([asPath]);

  const lastHistoryIndex = history.length - 2;
  const previousRoute = history[lastHistoryIndex > 0 ? lastHistoryIndex : 0];

  const removeHistory = () => {
    setHistory((prevHistory) =>
      prevHistory.length > 1
        ? prevHistory.filter((_, index) => index !== prevHistory.length - 1)
        : prevHistory
    );
  };

  useEffect(() => {
    setHistory((prevHistory) =>
      prevHistory[prevHistory.length - 1] !== asPath
        ? [...prevHistory, asPath]
        : prevHistory
    );
  }, [asPath]);

  return { previousRoute, removeHistory };
};
