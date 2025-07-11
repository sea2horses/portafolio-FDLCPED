// Efecto de desplazamiento suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });

      // Actualizar navegación activa
      document.querySelectorAll("nav a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Cambiar clase de header al desplazar
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// Menú móvil
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en enlace
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Animación al desplazar para proyectos y técnicas
const observerOptions = {
  threshold: 0.1,
};

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      projectObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .skill-card").forEach((card) => {
  projectObserver.observe(card);
});

// Actualizar navegación activa al desplazar
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Lightbox para obras de arte
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-content img, video");
const lightboxClose = document.querySelector(".lightbox-close");
const artItems = document.querySelectorAll(".art-item");

artItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imgSrc = item.querySelector("img").src;

    lightboxImg.src = imgSrc;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Animación de tecleo para el título
const heroTitle = document.querySelector(".hero h1");
const originalText = heroTitle.textContent;
heroTitle.textContent = "";

let i = 0;
const typeWriter = () => {
  if (i < originalText.length) {
    heroTitle.textContent += originalText.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
};

// Iniciar animación después de un pequeño retraso
setTimeout(typeWriter, 500);
