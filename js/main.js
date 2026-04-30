document.getElementById("year").textContent = new Date().getFullYear();
// Giữ nếu bạn dùng:
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===========================================================
//  EMAIL REVEAL — assemble email only on user click
//  so the address never appears in the page source.
// ===========================================================
document.addEventListener("DOMContentLoaded", () => {
  const emailBtn = document.getElementById("emailReveal");
  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      const a = emailBtn.dataset.a;
      const b = emailBtn.dataset.b;
      const c = emailBtn.dataset.c;
      if (!a || !b || !c) return;

      const email = a + "@" + b + "." + c;

      const link = document.createElement("a");
      link.href = "mailto:" + email;
      link.className = "contact-email-link";
      link.setAttribute("aria-label", "Email " + email);

      // Re-use the envelope SVG from the original button
      const icon = emailBtn.querySelector("svg");
      if (icon) link.appendChild(icon.cloneNode(true));

      const text = document.createTextNode(email);
      link.appendChild(text);

      emailBtn.replaceWith(link);
    });
  }
});

// Toggle "More photos" cho gallery sound designers
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".designer-more");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const gallery = btn.closest(".designer-gallery");
      gallery.classList.toggle("show-all");

      if (gallery.classList.contains("show-all")) {
        btn.textContent = "Show less";
      } else {
        btn.textContent = "More photos";
      }
    });
  });


  // ===========================================================
  //  INFO POPUP  (for the About Me highlighted words)
  // ===========================================================

  // Nội dung cho từng popup.
  // Muốn thêm/sửa popup nào thì chỉnh ở đây.
  const popupData = {
    cmgt: {
      title: "Creative Media and Game Technologies",
      body: "A bachelor programme at Saxion University of Applied Sciences where students learn game design, game development, and creative media hands-on. It's the programme I'm currently studying, and where I've been building my foundation in game design, sound design, and programming.",
      image: "assets/popup-cmgt.jpg",
      alt: "Saxion Creative Media and Game Technologies"
    },
    ableton: {
      title: "Ableton Live",
      body: "My main DAW (Digital Audio Workstation) for music production, sound design, and composition. I use Ableton for arranging, synth design, mixing and mastering it's the tool behind most of my music and SFX work.",
      image: "assets/popup-ableton.jpg",
      alt: "Ableton Live"
    },
    serum: {
      title: "Serum 2",
      body: "One of my favorite plugins a wavetable synthesizer that gives me endless possibilities, from cinematic effects to high-quality instrument presets. I use it both with presets and by designing my own sounds from scratch.",
      image: "assets/popup-serum.jpg",
      alt: "Serum 2 synthesizer"
    },

    fmod: {
      title: "FMOD",
      body: "An audio middleware built for games. I use FMOD to design adaptive music and interactive sound events, then hook them into Unity through parameters and a centralized AudioManager it's what makes game audio react to what the player is doing instead of just playing on loop.",
      image: "assets/popup-fmod.jpg",
      alt: "FMOD Studio"
    },
    unity: {
      title: "Unity",
      body: "The game engine I use for audio implementation and scripting. I work in Unity to integrate FMOD events, write C# audio logic, and prototype gameplay systems it's where all the sound design actually comes to life in the final product.",
      image: "assets/popup-unity.jpg",
      alt: "Unity game engine"
    },
    gamelab: {
      title: "Gamelab Oost",
      body: "A game development lab in the east of the Netherlands where I did my sound design internship. Working there gave me hands-on experience on real projects and taught me how audio fits into a professional game development pipeline.",
      image: "assets/popup-gamelab.jpg",
      alt: "Gamelab Oost"
    }
  };


  const popup = document.getElementById("infoPopup");

  // Nếu trang hiện tại không có popup (ví dụ sound-portfolio.html),
  // thì không làm gì thêm.
  if (!popup) return;

  const popupTitle = document.getElementById("popupTitle");
  const popupBody  = document.getElementById("popupBody");
  const popupImg   = document.getElementById("popupImg");
  const popupClose = popup.querySelector(".popup-close");

  function openPopup(key) {
    const data = popupData[key];
    if (!data) return;

    popupTitle.textContent = data.title;
    popupBody.textContent  = data.body;
    popupImg.src = data.image;
    popupImg.alt = data.alt || "";

    popup.hidden = false;
    document.body.style.overflow = "hidden"; // khoá scroll nền
    popupClose.focus();
  }

  function closePopup() {
    popup.hidden = true;
    document.body.style.overflow = "";
  }

  // Mở popup khi click vào chữ vàng
  document.querySelectorAll(".info-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.popup;
      openPopup(key);
    });
  });

  // Nút X
  popupClose.addEventListener("click", closePopup);

  // Click ra ngoài modal -> đóng
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });

  // Phím Esc -> đóng
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !popup.hidden) closePopup();
  });
});


// ==========================================================================
//  SOUND LIBRARY — click-to-play audio list with category filtering
// ==========================================================================
(function () {
  function init() {
    const list = document.getElementById("libraryList");
    if (!list) return;

    const items = list.querySelectorAll(".library-item");
    const filters = document.querySelectorAll(".library-chip");
    const emptyEl = document.getElementById("libraryEmpty");

    let audio = null;
    let activeItem = null;

    function clearActive() {
      if (activeItem) {
        activeItem.classList.remove("is-playing");
        activeItem = null;
      }
      if (audio) {
        audio.pause();
        audio = null;
      }
    }

    function playItem(item) {
      // If clicking the currently playing item — toggle pause/stop
      if (activeItem === item) {
        clearActive();
        return;
      }

      clearActive();

      const src = item.dataset.src;
      if (!src) return;

      audio = new Audio(src);
      audio.preload = "auto";

      audio.addEventListener("ended", () => {
        if (activeItem === item) clearActive();
      });

      audio.addEventListener("error", () => {
        // File missing — gracefully reset state
        clearActive();
      });

      audio.play().catch(() => {
        clearActive();
      });

      item.classList.add("is-playing");
      activeItem = item;
    }

    items.forEach((item) => {
      const playBtn = item.querySelector(".library-play");
      if (!playBtn) return;
      playBtn.addEventListener("click", (e) => {
        e.preventDefault();
        playItem(item);
      });
    });

    // FILTER LOGIC
    function applyFilter(filter) {
      let visibleCount = 0;
      items.forEach((item) => {
        const cat = item.dataset.category;
        const matches = filter === "all" || cat === filter;
        item.classList.toggle("is-hidden", !matches);
        if (matches) visibleCount++;
      });
      if (emptyEl) emptyEl.hidden = visibleCount > 0;

      // If the currently playing item gets filtered out, stop playback
      if (activeItem && activeItem.classList.contains("is-hidden")) {
        clearActive();
      }
    }

    filters.forEach((chip) => {
      chip.addEventListener("click", () => {
        filters.forEach((c) => {
          c.classList.remove("is-active");
          c.setAttribute("aria-selected", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-selected", "true");
        applyFilter(chip.dataset.filter);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// ==========================================================================
//  MOBILE HAMBURGER MENU — inject a toggle button into the header on every
//  page and wire up open/close behavior. CSS handles all the visibility,
//  animation, and the desktop-vs-mobile show/hide via @media query.
// ==========================================================================
(function () {
  function init() {
    const headerInner = document.querySelector(".header .container");
    if (!headerInner) return;

    const nav = headerInner.querySelector(".nav");
    if (!nav) return;

    // Don't double-inject if for some reason init runs twice
    if (headerInner.querySelector(".menu-toggle")) return;

    // Build the hamburger button
    const button = document.createElement("button");
    button.className = "menu-toggle";
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open menu");
    button.setAttribute("aria-controls", "primary-nav");
    button.innerHTML =
      '<span class="menu-toggle-line"></span>' +
      '<span class="menu-toggle-line"></span>' +
      '<span class="menu-toggle-line"></span>';

    nav.id = nav.id || "primary-nav";

    // Insert button before the nav (so it sits between logo and nav)
    headerInner.insertBefore(button, nav);

    function setOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
      button.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      document.body.classList.toggle("menu-open", isOpen);
    }

    button.addEventListener("click", () => {
      const willOpen = !nav.classList.contains("is-open");
      setOpen(willOpen);
    });

    // Close when any nav link is tapped
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    // Close on Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
      }
    });

    // Close if viewport grows past the mobile breakpoint while menu is open
    let mql;
    if (window.matchMedia) {
      mql = window.matchMedia("(min-width: 721px)");
      const onChange = (e) => { if (e.matches) setOpen(false); };
      if (mql.addEventListener) mql.addEventListener("change", onChange);
      else if (mql.addListener) mql.addListener(onChange);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// ==========================================================================
//  SCROLL-REVEAL — fade each .section into view as it enters the viewport.
//  Sections are visible by default; we add .reveal-ready (which hides them)
//  only after JS confirms it can run. This keeps the site usable for any
//  edge case where JS doesn't load.
// ==========================================================================
(function () {
  // Honour user's reduced-motion preference — skip the whole effect
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // IntersectionObserver isn't supported in very old browsers — fall back
  // to "do nothing" so content stays visible.
  if (!("IntersectionObserver" in window)) return;

  function init() {
    const sections = document.querySelectorAll(".section");
    if (!sections.length) return;

    // Hide them now that we know JS is running and the observer is supported
    sections.forEach((s) => s.classList.add("reveal-ready"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    sections.forEach((s) => observer.observe(s));

    // Safety net: after 1.5s, force-reveal anything still hidden
    // (handles weird cases like sections taller than the viewport)
    setTimeout(() => {
      document.querySelectorAll(".section.reveal-ready:not(.is-visible)").forEach((s) => {
        s.classList.add("is-visible");
      });
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
