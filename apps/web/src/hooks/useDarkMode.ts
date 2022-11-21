import { useEffect, useState } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode");

    if (!isDarkMode || isDarkMode === "false") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    if (darkMode) {
      localStorage.setItem("darkMode", "false");
      setDarkMode(false);
    } else {
      localStorage.setItem("darkMode", "true");
      setDarkMode(true);
    }
  };

  return { toggle: toggleDarkMode, value: darkMode };
}
