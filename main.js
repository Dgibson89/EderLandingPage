const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".parallax-content");
const parallaxDivider = document.querySelector(".parallax-divider");
const parallaxText = document.querySelector(".parallax-text");

// Mobile nav toggle
if (navToggle && navMenu) {
  navToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = navMenu.classList.toggle("active");
    navToggle.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Close mobile menu when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu && navToggle) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Active nav link on scroll
const updateActiveLink = () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });
};

// Reveal on scroll
const revealElements = document.querySelectorAll(
  ".service-card, .about-text, .about-image-wrapper, .gallery-item, .contact-card, .section-heading"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  element.classList.add("hidden");
  revealObserver.observe(element);
});

// Simple gallery lightbox
const galleryItems = document.querySelectorAll(".gallery-item img");

if (galleryItems.length > 0) {
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close image viewer">&times;</button>
    <img class="lightbox-image" src="" alt="Expanded gallery image" />
  `;

  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  galleryItems.forEach((image) => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// Parallax effect
const handleParallax = () => {
  const scrollY = window.scrollY;
  const isDesktop = window.innerWidth > 768;

  if (hero && isDesktop) {
    hero.style.backgroundPosition = `center ${scrollY * 0.35}px`;
  } else if (hero) {
    hero.style.backgroundPosition = "center center";
  }

  if (heroContent && isDesktop) {
    heroContent.style.transform = `translateY(${scrollY * 0.18}px)`;
  } else if (heroContent) {
    heroContent.style.transform = "translateY(0)";
  }

  if (parallaxDivider) {
    const dividerTop = parallaxDivider.offsetTop;
    const dividerOffset = (scrollY - dividerTop) * 0.2;

    if (isDesktop) {
      parallaxDivider.style.backgroundPosition = `center ${dividerOffset}px`;
    } else {
      parallaxDivider.style.backgroundPosition = "center center";
    }
  }

  if (parallaxText) {
    const dividerTop = parallaxDivider.offsetTop;
    const textOffset = (scrollY - dividerTop) * 0.12;

    if (isDesktop) {
      parallaxText.style.transform = `translateY(${textOffset}px)`;
    } else {
      parallaxText.style.transform = "translateY(0)";
    }
  }
};

window.addEventListener("scroll", () => {
  updateActiveLink();
  handleParallax();
});

window.addEventListener("load", () => {
  updateActiveLink();
  handleParallax();
});

window.addEventListener("resize", handleParallax);