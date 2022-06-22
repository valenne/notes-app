let options = {
  root: null,
  rootMargin: "-62px",
  threshold: 0,
};

const target = document.querySelector(".hero-section");

const header = document.querySelector(".header");

const onIntersection = (entries) => {
  let entry = entries[0];

  if (entry.isIntersecting === false) {
    header.classList.add("sticky");
  } else if (entry.isIntersecting === true) {
    header.classList.remove("sticky");
  }
};

const observer = new IntersectionObserver(onIntersection, options);

observer.observe(target);

// fade in effect on a index page hero section

const checkpoint = 280;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= checkpoint) {
    opacity = 1 - currentScroll / checkpoint;
  } else {
    opacity = 0;
  }
  document.querySelector(".hero-box__left").style.opacity = opacity;
});
