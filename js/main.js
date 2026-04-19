document.getElementById("year").textContent = new Date().getFullYear();
// Giữ nếu bạn dùng:
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

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
