import { useEffect, useState } from "react";

export function useDarkMode(initialState = false) {
  const [darkMode, setDarkMode] = useState(initialState);

  function toggleDarkMode() {
    if (darkMode) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }
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

  return { toggle: toggleDarkMode, value: darkMode };
}
