// scripts/theme.js

document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.createElement("button");
  themeBtn.className = "theme-toggle-btn";
  document.body.appendChild(themeBtn);

  const updateIcon = (theme) => {
    if (theme === "light") themeBtn.textContent = "🌞";
    else if (theme === "dark") themeBtn.textContent = "🌙";
    else themeBtn.textContent = "🖥️"; // auto
  };

  const applyTheme = (theme) => {
    const themeLink = document.getElementById("theme-link");
    if (theme === "dark") {
      themeLink.href = "styles/dark.css";
    } else if (theme === "light") {
      themeLink.href = "styles/light.css";
    } else {
      // auto: match system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      themeLink.href = prefersDark ? "styles/dark.css" : "styles/light.css";
    }
    localStorage.setItem("theme", theme);
    updateIcon(theme);
  };

  // Cycle through light → dark → auto
  themeBtn.onclick = () => {
    const current = localStorage.getItem("theme") || "auto";
    const next = current === "light" ? "dark" : current === "dark" ? "auto" : "light";
    applyTheme(next);
  };

  const initialTheme = localStorage.getItem("theme") || "auto";
  applyTheme(initialTheme);
});
