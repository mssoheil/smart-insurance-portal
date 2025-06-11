import * as React from "react";
// Utilities
import * as DarkReader from "darkreader";

const DarkReaderOptions = {
  brightness: 100,
  useFont: false,
};
export function useDarkMode() {
  const [activeIndex, setActiveIndex] = React.useState<0 | 1 | 2>(0);
  const theme = localStorage.getItem("theme");
  const isDark = theme === "darkMode";
  const isLight = theme === "lightMode";
  const isAuto = theme === "autoMode";

  function detectedDarkMode() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  React.useEffect(() => {
    if (isAuto) {
      setActiveIndex(2);
      const isDarkMode = detectedDarkMode();
      setTheme(isDarkMode ? "dark" : "light");
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", handlePrefersColorSchemeChanges);
    } else {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handlePrefersColorSchemeChanges);
      if (isDark) {
        enableDarkMode();
      } else {
        enableLightMode();
      }
    }

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handlePrefersColorSchemeChanges);
    };
  }, []);

  function handlePrefersColorSchemeChanges(e: MediaQueryListEvent) {
    setTheme(e.matches ? "dark" : "light");
  }

  function setTheme(theme: "light" | "dark") {
    if (theme === "light") {
      DarkReader.disable();
      document.body.dataset["theme"] = "light";
    } else {
      DarkReader.enable(DarkReaderOptions);
      document.body.dataset["theme"] = "dark";
    }
  }

  function enableDarkMode() {
    setActiveIndex(1);
    localStorage.setItem("theme", "darkMode");
    setTheme("dark");
  }

  function enableAutoDetect() {
    setActiveIndex(2);
    localStorage.setItem("theme", "autoMode");
    const isDarkMode = detectedDarkMode();
    setTheme(isDarkMode ? "dark" : "light");
  }

  function enableLightMode() {
    setActiveIndex(0);
    DarkReader.disable();
    localStorage.setItem("theme", "lightMode");
    setTheme("light");
  }

  return {
    activeIndex,
    isAuto,
    isLight,
    isDark,
    setActiveIndex,
    enableDarkMode,
    enableLightMode,
    enableAutoDetect,
  };
}
