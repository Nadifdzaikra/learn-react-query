"use client";

import { useEffect, useState } from "react";

export default function ThemeState() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Cek tema dari localStorage saat pertama kali load
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "night" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-outline">
      {theme === "light" ? "🌙 Night Mode" : "☀️ Light Mode"}
    </button>
  );
}
