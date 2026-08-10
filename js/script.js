"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".slider-dot")];
  const previousButton = document.getElementById("previousSlide");
  const nextButton = document.getElementById("nextSlide");
  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigation");
  let currentSlide = 0;
  let timer;

  function showSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
  }

  function startCarousel() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  previousButton?.addEventListener("click", () => { showSlide(currentSlide - 1); startCarousel(); });
  nextButton?.addEventListener("click", () => { showSlide(currentSlide + 1); startCarousel(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); startCarousel(); }));

  menuButton?.addEventListener("click", () => navigation?.classList.toggle("open"));
  navigation?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navigation.classList.remove("open")));

  document.querySelectorAll("img").forEach(image => image.addEventListener("error", () => console.error(`No se pudo cargar: ${image.src}`)));
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  showSlide(0);
  startCarousel();
});
