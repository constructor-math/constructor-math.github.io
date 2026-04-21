const body = document.body;
const navbar = document.getElementById("navbar") || document.querySelector(".navbar");
const menuToggle = document.getElementById("menuToggle") || document.querySelector(".menu-toggle") || document.querySelector(".hamburger");
const mobileOverlay = document.getElementById("mobileOverlay");
const dropdownTriggers = document.querySelectorAll("[data-dropdown-trigger], .dropdown-toggle-mobile, .dropdown-toggle");
const dropdownItems = document.querySelectorAll(".nav-dropdown, .dropdown");
const navLinks = document.querySelectorAll(".nav-panel a[href], .nav-links a[href]");
const yearTarget = document.getElementById("copyright-year");

const isDesktop = () => window.innerWidth > 900;

function setYear() {
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
}

function updateNavbarState() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 12);
}

function closeAllDropdowns(except = null) {
  dropdownItems.forEach((item) => {
    if (item === except) return;
    item.classList.remove("open");

    item.querySelectorAll("[data-dropdown-trigger], .dropdown-toggle-mobile, .dropdown-toggle").forEach((trigger) => {
      trigger.setAttribute("aria-expanded", "false");
    });
  });
}

function toggleDropdown(trigger) {
  const parent = trigger.closest(".nav-dropdown, .dropdown");
  if (!parent) return;

  const isOpen = parent.classList.contains("open");
  closeAllDropdowns(parent);
  parent.classList.toggle("open", !isOpen);

  parent.querySelectorAll("[data-dropdown-trigger], .dropdown-toggle-mobile, .dropdown-toggle").forEach((button) => {
    button.setAttribute("aria-expanded", String(!isOpen));
  });
}

function setMobileMenu(open) {
  if (!menuToggle) return;
  body.classList.toggle("nav-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
}

function handleNavLinkClick(event) {
  const clickedLink = event.currentTarget;
  const href = clickedLink.getAttribute("href") || "";
  const shouldClose = !href.startsWith("#") || !clickedLink.closest(".nav-dropdown, .dropdown");

  if (!isDesktop() && shouldClose) {
    setMobileMenu(false);
    closeAllDropdowns();
  }
}

function handleDocumentClick(event) {
  const clickedInsideNavbar = event.target.closest(".navbar") || event.target.closest(".nav-panel") || event.target.closest(".nav-links");
  if (!clickedInsideNavbar) {
    closeAllDropdowns();
  }
}

function setupScrollReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function handleResize() {
  if (isDesktop()) {
    setMobileMenu(false);
  }
  closeAllDropdowns();
}

function initNavigation() {
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const currentlyOpen = body.classList.contains("nav-open");
      setMobileMenu(!currentlyOpen);
      if (currentlyOpen) {
        closeAllDropdowns();
      }
    });
  }

  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      toggleDropdown(trigger);
    });
  });

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", () => {
      setMobileMenu(false);
      closeAllDropdowns();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  document.addEventListener("click", handleDocumentClick);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
      setMobileMenu(false);
    }
  });

  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", updateNavbarState, { passive: true });
  updateNavbarState();
}

setYear();
initNavigation();
setupScrollReveal();
