document.addEventListener("DOMContentLoaded", () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  applyTheme(savedTheme);
  createToggleButton(savedTheme);
});

function applyTheme(theme) {
  const themeLink = document.getElementById("theme-link");
  if (themeLink) {
    themeLink.href = `styles/${theme}.css`;
    localStorage.setItem("theme", theme);
  }
  updateToggleIcon(theme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
}

function createToggleButton(theme) {
  const btn = document.createElement("button");
  btn.className = "theme-toggle-btn";
  btn.setAttribute("aria-label", "Toggle theme");
  btn.innerHTML = theme === "dark" ? "🌙" : "☀️";
  btn.addEventListener("click", toggleTheme);
  document.body.appendChild(btn);
}

function updateToggleIcon(theme) {
  const btn = document.querySelector(".theme-toggle-btn");
  if (btn) {
    btn.innerHTML = theme === "dark" ? "🌙" : "☀️";
  }
}
