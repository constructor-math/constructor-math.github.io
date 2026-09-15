const body = document.body;
const navbar = document.getElementById("navbar") || document.querySelector(".navbar");
const menuToggle =
  document.getElementById("menuToggle") ||
  document.querySelector(".menu-toggle") ||
  document.querySelector(".hamburger");

const mobileOverlay = document.getElementById("mobileOverlay");
const dropdownTriggers = document.querySelectorAll(
  "[data-dropdown-trigger], .dropdown-toggle-mobile"
);
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

    item
      .querySelectorAll("[data-dropdown-trigger], .dropdown-toggle-mobile")
      .forEach((trigger) => {
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

  parent
    .querySelectorAll("[data-dropdown-trigger], .dropdown-toggle-mobile")
    .forEach((button) => {
      button.setAttribute("aria-expanded", String(!isOpen));
    });
}

function setMobileMenu(open) {
  if (!menuToggle) return;

  body.classList.toggle("nav-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu"
  );
}

function handleNavLinkClick(event) {
  const clickedLink = event.currentTarget;
  const href = clickedLink.getAttribute("href") || "";
  const shouldClose =
    !href.startsWith("#") || !clickedLink.closest(".nav-dropdown, .dropdown");

  if (!isDesktop() && shouldClose) {
    setMobileMenu(false);
    closeAllDropdowns();
  }
}

function handleDocumentClick(event) {
  const clickedInsideNavbar =
    event.target.closest(".navbar") ||
    event.target.closest(".nav-panel") ||
    event.target.closest(".nav-links");

  if (!clickedInsideNavbar) {
    closeAllDropdowns();
  }
}

function setupScrollReveal() {
  // Subpage elements that should animate on scroll
  const subpageSelectors = [
    ".hero-content",
    ".image-container",
    ".highlight-box",
    ".key-takeaway",
    ".video-container",
    ".intro-emphasis",
    "#explanation h2",
    "#explanation h3",
    "#explanation p",
    ".speaker-card",
    ".card",
    ".event-card",
  ];
  subpageSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (!el.hasAttribute("data-reveal")) {
        el.setAttribute("data-reveal", "");
      }
    });
  });

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

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", () => {
      setMobileMenu(false);
      closeAllDropdowns();
    });
  }

  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      toggleDropdown(trigger);
    });
  });

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

const leadershipArchive = {
  "Spring 2025": [
    {
      role: "President",
      personId: "omar-elshinawy",
      name: "Omar Elshinawy",
      image: "./images/Omar-Elshinawy.jpg",
      alt: "Omar Elshinawy, President",
      bio: "Hi everyone, Omar here! During my term, I graduated six (hear that, Maghri?) amazing seminarists from the UgS research mentorship program. I served the society's Maths Support Center with 108+ hours. I procured 10+ mega squared pizzas to an audience of 60+ attendees, and created one of the coolest posters of all time (haters will disagree!). The Student Mathematical Society is a testament to the intellectual curiosity this very campus holds. It is an honour of the highest decree to have shaped the rebirth of this society. As my term comes to an end, it is now your turn to uphold its profound legacy, and sustain its tradition for years to come. But hey, no pressure 😎",
    },
  ],

  "25–26": [
    {
      role: "President",
      personId: "ahmed-maghri",
      name: "Ahmed Maghri",
      image: "./images/ahmad.jpeg",
      alt: "Ahmed Maghri, President",
      bio: "CS major with a minor in Mathematics & Modeling. Passionate about the intersection of math and CS — and ranked top 0.5% worldwide in osu!",
    },
    {
      role: "Tech Lead",
      personId: "zakaria",
      name: "Zakaria",
      image: "./images/zakaria.jpeg",
      alt: "Zakaria, Tech Lead",
      bio: "Dev team lead with a passion for alpinism. Whether it's in code or high up in the mountains, I love a good challenge.",
    },
    {
      role: "Media Lead",
      personId: "taha-hbirri",
      name: "Taha Hbirri",
      image: "./images/Taha.jpeg",
      alt: "Taha Hbirri, Media Lead",
      bio: "CS major and audio-visual lead. You'll spot me behind every Math Society Instagram post.",
    },
    {
      role: "Design Lead",
      personId: "yusuf-bugra-balta",
      name: "Yusuf Bugra Balta",
      image: "./images/Yusuf.jpeg",
      alt: "Yusuf Bugra Balta, Design Lead",
      bio: "MMDA student from Turkey. Enjoys reading and gaming in his free time.",
    },
    {
      role: "Logistics & Project Management Lead",
      personId: "eyosiyas",
      name: "Eyosiyas",
      image: "./images/Eyosiyas.jpeg",
      alt: "Eyosiyas, Logistics and Project Management Lead",
      bio: "Industrial Engineering & Management student who genuinely loves planning events. When not optimizing schedules, I'm probably traveling or turning a quick outing into a full-day adventure. ✈️",
    },
  ],

  "26–27": [
    {
      role: "President",
      personId: "ahmed-maghri",
      name: "Ahmed Maghri",
      image: "./images/ahmad.jpeg",
      alt: "Ahmed Maghri, President",
      bio: "CS major with a minor in Mathematics & Modeling. Passionate about the intersection of math and CS — and ranked top 0.5% worldwide in osu!",
    },
    {
      role: "Co-President",
      personId: "shaz-ansari",
      name: "Shaz Ansari",
      image: "./images/Shaz.jpeg",
      alt: "Shaz Ansari, Co-President",
      bio: "I'm a second year Robotics student. In my free time I'm probably playing guitar to Radiohead — if you're a rock fan too, come find me. Long-term I'm chasing a career in robotics and AI.",
    },
    {
      role: "Media Lead",
      personId: "taha-hbirri",
      name: "Taha Hbirri",
      image: "./images/Taha.jpeg",
      alt: "Taha Hbirri, Media Lead",
      bio: "CS major and audio-visual lead. You'll spot me behind every Math Society Instagram post.",
    },
    {
      role: "Design Lead",
      personId: "yusuf-bugra-balta",
      name: "Yusuf Bugra Balta",
      image: "./images/Yusuf.jpeg",
      alt: "Yusuf Bugra Balta, Design Lead",
      bio: "MMDA student from Turkey. Enjoys reading and gaming in his free time.",
    },
    {
      role: "Logistics & Project Management Lead",
      personId: "eyosiyas",
      name: "Eyosiyas",
      image: "./images/Eyosiyas.jpeg",
      alt: "Eyosiyas, Logistics and Project Management Lead",
      bio: "Industrial Engineering & Management student who genuinely loves planning events. When not optimizing schedules, I'm probably traveling or turning a quick outing into a full-day adventure. ✈️",
    },
    {
      role: "Operations Lead",
      personId: "julissa-barahona",
      name: "Julissa Barahona",
      image: "./images/Julissa.jpeg",
      alt: "Julissa Barahona, Operations Lead",
      bio: "CS major & Cybersecurity enthusiast. Adventure seeker with an endless curiosity and a serious love for books. If there's something new to learn, build, or explore, count me in.",
    },
    {
      role: "Latex Lead",
      personId: "sarang-sule",
      name: "Sarang Sule",
      image: "./images/Sarang.jpeg",
      alt: "Sarang Sule, Latex Lead",
      bio: "I am a 2nd Year MMDA Major with a passion for music, cricket, lego and teaching. I also play (a lot) online on lichess.",
    },
    {
      role: "Tech Lead",
      personId: "leyla-hajizada",
      name: "Leyla Hajizada",
      image: "./images/Leyla.jpeg",
      alt: "Leyla Hajizada, Tech Lead",
      bio: "2nd-year CS major and Tech Lead. I enjoy coding, solving problems, and making computers do what I want — though they don't always cooperate.",
    },
  ],

  // Add older/newer academic years here — copy a year's structure above.
};

function createLeadershipCard(lead) {
  const card = document.createElement("article");
  card.className = "profile-card glass-card interactive-card";
  card.dataset.role = lead.role;
  card.dataset.personId = lead.personId;
  card.innerHTML = leadershipCardMarkup(lead);
  return card;
}

function leadershipCardMarkup(lead) {
  return `
    <img src="${lead.image}" alt="${lead.alt}" loading="lazy" decoding="async" />
    <div class="profile-card__body">
      <span class="profile-role">${lead.role}</span>
      <h3>${lead.name}</h3>
      <p>${lead.bio}</p>
    </div>
  `;
}

function initLeadershipArchive() {
  const grid = document.getElementById("teamGrid");
  const prev = document.getElementById("teamYearPrev");
  const next = document.getElementById("teamYearNext");
  const label = document.getElementById("teamYearLabel");
  if (!grid || !prev || !next || !label) return;

  const years = Object.keys(leadershipArchive);
  if (!years.length) return;

  let currentIndex = years.length - 1;

  function updateControls() {
    const yearLabels = {
      "Spring 2025": "Spring 2025",
      "25–26": "2025–2026",
      "26–27": "2026–2027",
    };
    label.textContent = yearLabels[years[currentIndex]] || years[currentIndex];
    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex === years.length - 1;
  }

  function renderInitial() {
    grid.replaceChildren(...leadershipArchive[years[currentIndex]].map(createLeadershipCard));
    updateControls();
  }

  function changeYear(direction) {
    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= years.length) return;

    const currentYear = years[currentIndex];
    const nextYear = years[nextIndex];
    const currentLeads = leadershipArchive[currentYear];
    const nextLeads = leadershipArchive[nextYear];
    const oldCards = new Map([...grid.children].map((card) => [card.dataset.role, card]));
    const nextRoles = new Set(nextLeads.map((lead) => lead.role));
    const claimedCards = new Set();

    // This role handoff is intentional: in the archive's second slot, the
    // 25–26 Tech Lead card becomes the 26–27 Co-President card (and vice
    // versa). Reusing the same DOM card makes the page-turn feel identical
    // in both directions instead of one direction simply inserting a card.
    const roleHandoffs = new Map([
      ["25–26→26–27", new Map([["Co-President", "Tech Lead"]])],
      ["26–27→25–26", new Map([["Tech Lead", "Co-President"]])],
    ]);
    const handoffsForTransition = roleHandoffs.get(`${currentYear}→${nextYear}`) || new Map();

    function turnCard(existing, lead) {
      claimedCards.add(existing);
      existing.classList.remove("team-card--turning");
      void existing.offsetWidth;
      existing.classList.add("team-card--turning");

      window.setTimeout(() => {
        existing.innerHTML = leadershipCardMarkup(lead);
        existing.dataset.personId = lead.personId;
        existing.dataset.role = lead.role;
      }, 300);

      grid.appendChild(existing);
    }

    // Dynamically inserted team cards should behave exactly like the rest of
    // the site's scroll-reveal elements: hidden until they enter the viewport,
    // with no special year-switch animation.
    function observeNewCard(card) {
      card.setAttribute("data-reveal", "");
      card.classList.remove("is-visible");

      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
      );

      revealObserver.observe(card);
    }

    nextLeads.forEach((lead) => {
      let existing = oldCards.get(lead.role);

      // Prefer the explicit archive handoff when this destination role should
      // visually grow out of a different role from the previous year.
      const sourceRole = handoffsForTransition.get(lead.role);
      if (sourceRole) {
        const handoffCard = oldCards.get(sourceRole);
        if (handoffCard && !claimedCards.has(handoffCard)) existing = handoffCard;
      }

      if (!existing || claimedCards.has(existing)) {
        const newCard = createLeadershipCard(lead);
        grid.appendChild(newCard);
        observeNewCard(newCard);
        return;
      }

      // The only morphing handoff is Zakaria ↔ Shaz.
      if (sourceRole) {
        turnCard(existing, lead);
        return;
      }

      claimedCards.add(existing);

      // Keep unchanged people completely still.
      if (existing.dataset.personId === lead.personId && existing.dataset.role === lead.role) {
        grid.appendChild(existing);
        return;
      }

      // Any other changed card is replaced without the page-turn effect.
      existing.innerHTML = leadershipCardMarkup(lead);
      existing.dataset.personId = lead.personId;
      existing.dataset.role = lead.role;
      grid.appendChild(existing);
    });

    // Anything from the old year that was not reused disappears immediately.
    // No year-switch exit animation is used for ordinary added/removed leads.
    oldCards.forEach((card, role) => {
      if (!claimedCards.has(card) && (!nextRoles.has(role) || card.dataset.role === role)) {
        card.remove();
      }
    });

    currentIndex = nextIndex;
    updateControls();
  }

  prev.addEventListener("click", () => changeYear(-1));
  next.addEventListener("click", () => changeYear(1));
  renderInitial();
}

initLeadershipArchive();
