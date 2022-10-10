//-------------------------home slider-----------------------//
const slides = document.querySelectorAll(".pagination"),
  mainSlide = document.querySelector(".slide_img img");
for (let i = 0; i < slides.length; i++) {
  slides[i].addEventListener("mouseover", () => {
    removeAll(slides);
    slides[i].classList.add("active");
    let src = slides[i].querySelector("img").src;
    mainSlide.src = src;
  });
}
function removeAll(arr) {
  arr.forEach(el => el.classList.remove("active"));
}
//------------------fixed navbar----------------------------//
let nav = document.querySelector("header nav"),
  main = document.querySelector("header main"),
  fixedPoint = main.offsetTop;
window.onscroll = function() {
  if (this.scrollY >= fixedPoint - 40) {
    nav.classList.add("active");
    main.classList.add("stretch");
  } else {
    nav.classList.remove("active");
    main.classList.remove("stretch");
  }
};
//------------------Nav Links hover----------------------------//
let navLinks = document.querySelectorAll(".nav_link");
let sections = document.querySelectorAll(".sec");
let current;
window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    let secTop = sec.offsetTop;
    if (pageYOffset >= secTop - 80) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.classList.contains(current)) {
      link.classList.add("active");
    }
  });
});
//---------------------------------about slider--------------//
const slideLinks = document.querySelectorAll(".pagi"),
  slidesSrcs = ["burger.png", "pizza.png", "cupcake.png"],
  mainSlideContainer = document.querySelector("#main_slide img"),
  next_btn = document.getElementById("right"),
  prev_btn = document.getElementById("left");
let currentSlide = 0;
for (let i = 0; i < slideLinks.length; i++) {
  slideLinks[i].addEventListener("click", () => {
    removeAll(slideLinks);
    slideLinks[i].classList.add("active");
    mainSlideContainer.src = `images/${slidesSrcs[i]}`;
    currentSlide = i;
  });
}
next_btn.addEventListener("click", () => {
  if (currentSlide === slidesSrcs.length - 1) {
    currentSlide = 0;
    mainSlideContainer.src = `images/${slidesSrcs[currentSlide]}`;
    removeAll(slideLinks);
    slideLinks[currentSlide].classList.add("active");
  } else {
    currentSlide++;
    mainSlideContainer.src = `images/${slidesSrcs[currentSlide]}`;
    removeAll(slideLinks);
    slideLinks[currentSlide].classList.add("active");
  }
});
prev_btn.addEventListener("click", () => {
  if (currentSlide === 0) {
    currentSlide = slidesSrcs.length - 1;
    mainSlideContainer.src = `images/${slidesSrcs[currentSlide]}`;
    removeAll(slideLinks);
    slideLinks[currentSlide].classList.add("active");
  } else {
    currentSlide--;
    mainSlideContainer.src = `images/${slidesSrcs[currentSlide]}`;
    removeAll(slideLinks);
    slideLinks[currentSlide].classList.add("active");
  }
});
//---------------------- testimonial slider ------------------------//
const track = document.querySelector(".slider_track"),
  testiSlides = Array.from(track.children),
  slideWidth = testiSlides[0].getBoundingClientRect().width,
  nextButton = document.querySelector("#test_forward"),
  prevButton = document.querySelector("#test_prev");
//arrange the slides next to one another
const setSlidePostion = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
testiSlides.forEach(setSlidePostion);
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};
const disableButtons = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex == 0) {
    prevButton.classList.add("disable");
    nextButton.classList.remove("disable");
  } else if (targetIndex == slides.length - 1) {
    prevButton.classList.remove("disable");
    nextButton.classList.add("disable");
  } else {
    prevButton.classList.remove("disable");
    nextButton.classList.remove("disable");
  }
};
// next btn //
nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const nextIndex = testiSlides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);
  disableButtons(testiSlides, prevButton, nextButton, nextIndex);
});
// prev btn //
prevButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const prevIndex = testiSlides.findIndex(slide => slide === prevSlide);
  moveToSlide(track, currentSlide, prevSlide);
  disableButtons(testiSlides, prevButton, nextButton, prevIndex);
});
//------------------Map section----------------------------//
if (navigator.geolocation) {
  const pos = [30.560668, 31.018417];
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      const map = L.map("mapLocation").setView(coords, 11);
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker(coords).addTo(map).bindPopup("This is your Location");
      L.marker(pos).addTo(map).bindPopup("This is our Location").openPopup();
    },
    function() {
      alert("cannot get current position");
    }
  );
}