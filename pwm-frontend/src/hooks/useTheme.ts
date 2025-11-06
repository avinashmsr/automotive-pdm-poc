import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return (attr === "dark" ? "dark" : "light");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const set = (t: Theme) => setTheme(t);

  return { theme, toggle, set };
}