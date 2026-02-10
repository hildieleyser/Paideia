const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const form = document.getElementById("application-form");
const success = document.getElementById("success");

if (form) {
  form.addEventListener("submit", () => {
    setTimeout(() => {
      success.classList.remove("hidden");
      form.classList.add("hidden");
    }, 600);
  });
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const heroCard = document.querySelector(".hero-card");
const orbit = document.querySelector(".hero-orbit");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.gap = "1rem";
    navLinks.style.background = "rgba(245, 241, 234, 0.95)";
    navLinks.style.padding = "1rem";
    navLinks.style.position = "absolute";
    navLinks.style.top = "70px";
    navLinks.style.right = "6vw";
    navLinks.style.borderRadius = "16px";
  });
}

if (heroCard || orbit) {
  const strength = 10;
  window.addEventListener("mousemove", (event) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * strength;
    const y = (event.clientY / innerHeight - 0.5) * strength;
    if (heroCard) {
      heroCard.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    if (orbit) {
      orbit.style.transform = `translate3d(${-x * 0.6}px, ${-y * 0.6}px, 0)`;
    }
  });
}
