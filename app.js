(() => {
  "use strict";

  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("transportToolsTheme");
  const preferredDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.dataset.theme = "dark";
      toggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      delete root.dataset.theme;
      toggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  applyTheme(savedTheme || (preferredDark ? "dark" : "light"));

  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("transportToolsTheme", next);
    applyTheme(next);
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
