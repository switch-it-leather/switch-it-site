// モバイル用ナビゲーション開閉
document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (!toggle || !header) return;

  toggle.addEventListener("click", function () {
    var isOpen = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // メニュー内リンクをクリックしたら閉じる
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});

// ==========================================================================
// 商品写真ギャラリー（サムネイル切り替え + 拡大表示）
// ==========================================================================
document.addEventListener("DOMContentLoaded", function () {
  var gallery = document.querySelector("[data-gallery]");
  var lightbox = document.getElementById("lightbox");
  if (!gallery || !lightbox) return;

  var mainBtn = gallery.querySelector(".photo-main");
  var mainImg = mainBtn.querySelector("img");
  var thumbs = Array.prototype.slice.call(gallery.querySelectorAll(".thumb"));

  var lbImg = lightbox.querySelector(".lb-img");
  var lbCaption = lightbox.querySelector(".lb-caption");
  var lbCurrent = lightbox.querySelector(".lb-current");
  var lbTotal = lightbox.querySelector(".lb-total");
  var btnClose = lightbox.querySelector(".lb-close");
  var btnPrev = lightbox.querySelector(".lb-prev");
  var btnNext = lightbox.querySelector(".lb-next");

  // サムネイルから写真の一覧を組み立てる
  var photos = thumbs.map(function (t) {
    var img = t.querySelector("img");
    return { src: img.getAttribute("src"), alt: img.getAttribute("alt") || "" };
  });

  var index = 0;
  var lastFocused = null;
  lbTotal.textContent = photos.length;

  // メイン写真を切り替える
  function setPhoto(i) {
    index = (i + photos.length) % photos.length;
    var p = photos[index];
    mainImg.setAttribute("src", p.src);
    mainImg.setAttribute("alt", p.alt);
    thumbs.forEach(function (t, n) {
      t.classList.toggle("is-active", n === index);
    });
    if (!lightbox.hidden) updateLightbox();
  }

  function updateLightbox() {
    var p = photos[index];
    lbImg.setAttribute("src", p.src);
    lbImg.setAttribute("alt", p.alt);
    lbCaption.textContent = p.alt;
    lbCurrent.textContent = index + 1;
    // 切り替えのたびにフェードさせる
    lbImg.style.animation = "none";
    void lbImg.offsetWidth;
    lbImg.style.animation = "";
  }

  function openLightbox() {
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    updateLightbox();
    btnClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  // サムネイルのクリックでメイン写真を切り替え
  thumbs.forEach(function (t, n) {
    t.addEventListener("click", function () { setPhoto(n); });
  });

  mainBtn.addEventListener("click", openLightbox);
  btnClose.addEventListener("click", closeLightbox);
  btnPrev.addEventListener("click", function () { setPhoto(index - 1); });
  btnNext.addEventListener("click", function () { setPhoto(index + 1); });

  // 背景をクリックしても閉じる
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // キーボード操作（Esc で閉じる、矢印で前後）
  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") setPhoto(index - 1);
    if (e.key === "ArrowRight") setPhoto(index + 1);
  });

  // スマホのスワイプ操作
  var touchStartX = 0;
  lightbox.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", function (e) {
    var diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) setPhoto(diff > 0 ? index - 1 : index + 1);
  }, { passive: true });
});


// ==========================================================================
// スクロールで要素をふわりと表示する
// ==========================================================================
document.addEventListener("DOMContentLoaded", function () {
  var targets = document.querySelectorAll(".band, .color-group, .section-head");
  if (!targets.length) return;

  // 動きを控える設定の場合は何もしない
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // 対応していないブラウザではそのまま表示
  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  targets.forEach(function (el) { el.classList.add("reveal"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  targets.forEach(function (el) { io.observe(el); });
});
