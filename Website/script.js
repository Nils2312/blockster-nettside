const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const logoContainer = document.getElementById("logoContainer");
const mainBrand = document.getElementById("mainBrand");

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("open");
  mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open");

  if (!isOpen) {
    if (!document.body.classList.contains("projects-page")) {
      logoContainer.classList.add("menu-open");
      mainBrand.style.color = "#4caf50";
    }
    document.body.classList.add("no-scroll"); 
  } else {
    if (!document.body.classList.contains("projects-page")) {
      logoContainer.classList.remove("menu-open");
      mainBrand.style.color = "white";
    }
    document.body.classList.remove("no-scroll"); 
  }
});

const transitionLinks = document.querySelectorAll(
  ".grid-button, .nav-links a, .mobile-nav a, .logo-block, .contact-box, .footer a, .footer-icon"
);

transitionLinks.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (!href) return;
    let targetPage = href.startsWith("#") ? href.slice(1) + ".html" : href;
    if (
  targetPage.endsWith(".html") ||
  targetPage.endsWith("/") ||
  !targetPage.includes(".") 
) {

      e.preventDefault();
      const origTrans = mobileMenu.style.transition;
      mobileMenu.style.transition = "none";
      startBlockTransition(() => {
        mobileMenu.style.transition = origTrans;
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("open");
        logoContainer.classList.remove("menu-open");
        mainBrand.style.color = "white";
        window.location.href = targetPage;
      });
    }
  });
});

function startBlockTransition(callback) {
  const overlay = document.createElement("div");
  overlay.className = "transition-overlay";
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.style.background = "rgba(0, 0, 0, 0.95)";
  });

  const grid = document.createElement("div");
  grid.className = "transition-grid";
  const blockSize = 100;
  const cols = Math.ceil(window.innerWidth / blockSize);
  const rows = Math.ceil(window.innerHeight / blockSize);
  grid.style.gridTemplateColumns = `repeat(${cols}, ${blockSize}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${blockSize}px)`;
  document.body.appendChild(grid);

  const blocks = [];
  for (let i = 0; i < cols * rows; i++) {
    const b = document.createElement("div");
    b.className = "transition-block";
    grid.appendChild(b);
    blocks.push(b);
  }

  const shuffled = blocks.sort(() => Math.random() - 0.5);
  const totalTime = 600;
  const step = totalTime / shuffled.length;
  let lastDelay = 0;
  shuffled.forEach((b, i) => {
    const d = i * step;
    setTimeout(() => {
      b.style.visibility = "visible";
      b.style.backgroundColor = "#ffffff";
    }, d);
    lastDelay = Math.max(lastDelay, d);
  });

  setTimeout(callback, lastDelay + 200);
}


window.addEventListener("resize", () => {
  if (window.innerWidth > 1024 && mobileMenu.classList.contains("open")) {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
    logoContainer.classList.remove("menu-open");
    mainBrand.style.color = "white";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".animated-hero span")
    .forEach((w, i) => w.style.animationDelay = `${i * 0.1}s`);
  document.querySelector(".logo-block").style.animationPlayState = "running";
  document.querySelector(".header").style.animationPlayState = "running";
});

const heroText = document.querySelector(".hero-text");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (heroText) {
    heroText.style.transform = `translateY(-${Math.min(y / 10, 80)}px)`;
  }
});

const introHeading = document.querySelector(".intro-heading");
const introText = document.querySelector(".intro-text");
if (introHeading && introText) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        introHeading.classList.add("animate");
        introText.classList.add("animate");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }).observe(introHeading);
}

const gridSection = document.querySelector(".grid-section");
const firstRowBoxes = document.querySelectorAll(
  ".grid-section .grid-row:first-child .animate-block"
);
if (gridSection) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        firstRowBoxes.forEach(box => box.classList.add("visible"));
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px 50px 0px"
  }).observe(gridSection);
}

const lastRowBoxes = document.querySelectorAll(
  ".grid-section .grid-row:nth-child(2) .animate-block"
);
lastRowBoxes.forEach(box => {
  const observer = new IntersectionObserver((entries, obsInner) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obsInner.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(box);
});

const parallaxImages = document.querySelectorAll(".grid-image > img");
window.addEventListener("scroll", () => {
  parallaxImages.forEach(img => {
    const rect = img.closest(".grid-image").getBoundingClientRect();
    const offset = rect.top / window.innerHeight;
    const translateY = offset * 40;
    img.style.transform = `scale(1.4) translateY(${translateY}px)`;
  });
});

const contactBoxes = document.querySelectorAll(".contact-grid .animate-block");
const contactObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px 10px 0px" 
});
contactBoxes.forEach(box => contactObserver.observe(box));


document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".mobile-nav a").forEach(el => el.classList.remove("clicked"));
    link.classList.add("clicked");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("projects-page")) {
    const projectTitle = document.querySelector(".projects-title.animate-block");
    const projectCards = document.querySelectorAll(".project-card.animate-block");

    if (projectTitle) {
      new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.01 }).observe(projectTitle);
    }

    projectCards.forEach(card => {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.07,
        rootMargin: "0px 0px 50px 0px"
      });
      observer.observe(card);
    });
  }
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
    });

    if (!isActive) item.classList.add('active');
  });
});

const galleryTrack = document.querySelector(".marquee-track");

if (galleryTrack) {
  const total = 10;
  const worldNames = [
    "DEEP SEA HORROR",
    "LEGENDARY DRAGONS",
    "DINOSAUR HORROR",
    "THE ICE AGE",
    "ALIEN ESCAPE",
    "ANTLERS",
    "DEEP SEA HORROR",
    "LEGENDARY DRAGONS",
    "DINOSAUR HORROR",
    "ALIEN ESCAPE"
  ];

  const copies = 30;
  for (let i = 0; i < total * copies; i++) {
    const imgIndex = (i % total) + 1;
    const name = worldNames[i % worldNames.length];
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `
      <img src="/files/${imgIndex}.webp" alt="Gallery Image ${imgIndex}">
      <div class="image-label">${name}</div>
    `;
    galleryTrack.appendChild(item);
  }

  let scrollPos = 0;
  let speed = 1.0;
  let targetSpeed = 1.0;

  function scrollGallery() {
    scrollPos += speed;
    galleryTrack.style.transform = `translateX(-${scrollPos}px)`;
    requestAnimationFrame(scrollGallery);
  }
  scrollGallery();

  const marquee = document.getElementById("galleryMarquee");
  if (marquee) {
    marquee.addEventListener("mouseenter", () => {
      targetSpeed = 0;
    });
    marquee.addEventListener("mouseleave", () => {
      targetSpeed = 1.0;
    });
  }

  setInterval(() => {
    if (speed < targetSpeed) speed += 0.03;
    else if (speed > targetSpeed) speed -= 0.03;
  }, 16);

  document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item, i) => {
      setTimeout(() => item.classList.add("fade-in"), i * 70);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const projectSection = document.querySelector(".projects-grid");
  const images = document.querySelectorAll(".project-card img");

  let loaded = 0;
  images.forEach(img => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === images.length) {
          projectSection.classList.add("loaded");
        }
      });
    }
  });

  if (loaded === images.length) {
    projectSection.classList.add("loaded");
  }
});







