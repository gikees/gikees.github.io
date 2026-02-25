(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  document.getElementById("light-toggle").addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";

    document.documentElement.classList.add("transition");

    if (next === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("theme", next);

    setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 500);
  });
})();
