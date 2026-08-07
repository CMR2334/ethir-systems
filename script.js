const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");

function closeMenu() {
  if (!menuButton || !nav) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  nav.dataset.open = "false";
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav.dataset.open = String(!isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

function syncFlowMotion() {
  document.querySelectorAll("[data-flow-motion]").forEach((svg) => {
    if (motionPreference.matches && typeof svg.pauseAnimations === "function") {
      svg.pauseAnimations();
    } else if (typeof svg.unpauseAnimations === "function") {
      svg.unpauseAnimations();
    }
  });
}

syncFlowMotion();
motionPreference.addEventListener?.("change", syncFlowMotion);
