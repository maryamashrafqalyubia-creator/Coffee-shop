(function initSlider() {
  const wrapper = document.querySelector("#offers .offers-items");
  if (!wrapper) return;

  const slides = Array.from(wrapper.children);
  if (slides.length === 0) return;

  let current = 0;
  let timer = null;

  wrapper.style.position = "relative";

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.style.display = i === current ? "" : "none";
    });
  }

  function makeButton(iconClass, side, label) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", label);
    btn.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
    btn.style.cssText = `
      position:absolute; top:50%; ${side}:10px; transform:translateY(-50%);
      width:42px; height:42px; border:none; border-radius:50%;
      background:rgba(0,0,0,.6); color:#fff; cursor:pointer; z-index:5; font-size:16px;`;
    return btn;
  }

  const prevBtn = makeButton("fa-chevron-left", "left", "Previous");
  const nextBtn = makeButton("fa-chevron-right", "right", "Next");
  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);

  function startAuto() {
    stopAuto();
    timer = setInterval(() => showSlide(current + 1), 4000);
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  prevBtn.addEventListener("click", () => {
    showSlide(current - 1);
    startAuto();
  });
  nextBtn.addEventListener("click", () => {
    showSlide(current + 1);
    startAuto();
  });
  wrapper.addEventListener("mouseenter", stopAuto);
  wrapper.addEventListener("mouseleave", startAuto);

  showSlide(0);
  startAuto();
})();

const columns = document.querySelectorAll(
  "#menu .menu-items-left, #menu .menu-items-right"
);
const btn = document.getElementById("exploreBtn");
const VISIBLE = 3;

// اخفي الأصناف بعد أول 3 في كل عمود
columns.forEach(col => {
  col.querySelectorAll(".menu-item").forEach((item, i) => {
    if (i >= VISIBLE) item.style.display = "none";
  });
});

// الزرار يعرض الباقي
btn.addEventListener("click", e => {
  e.preventDefault();
  document.querySelectorAll("#menu .menu-item").forEach(item => {
    item.style.display = "";
  });
  btn.style.display = "none";
});

/* -- Top button---- */
(function initBackToTop() {
  const btn = document.getElementById("topBtn");
  if (!btn) return;

  btn.style.display = "none";
  btn.style.cssText +=
    "position:fixed; bottom:25px; right:25px; z-index:999; cursor:pointer;";

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* --Gallery--- */
(function initLightbox() {
  const images = document.querySelectorAll("#gallery .img-gallery img");
  if (images.length === 0) return;

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,.85); display:none;
    align-items:center; justify-content:center; z-index:1000; cursor:pointer;`;

  const bigImg = document.createElement("img");
  bigImg.style.cssText = "max-width:90%; max-height:85%; border-radius:8px;";

  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.cssText =
    "position:absolute; top:15px; right:25px; color:#fff; font-size:40px;";

  overlay.appendChild(bigImg);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  images.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      bigImg.src = img.src;
      bigImg.alt = img.alt;
      overlay.style.display = "flex";
    });
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.style.display = "none";
  });
})();
