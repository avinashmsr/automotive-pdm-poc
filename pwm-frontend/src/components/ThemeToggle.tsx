import React from "react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      className="button"
      onClick={toggle}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{ display:"inline-flex", alignItems:"center", gap:8 }}
    >
      <span aria-hidden>{isDark ? "🌙" : "☀️"}</span>
      <span>{isDark ? "Dark" : "Light"} mode</span>
    </button>
  );
}