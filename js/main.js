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
});