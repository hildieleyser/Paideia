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
const steps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("next-step");
const prevBtn = document.getElementById("prev-step");
const submitBtn = document.getElementById("submit-step");
let currentStep = 0;

if (form) {
  form.addEventListener("submit", () => {
    setTimeout(() => {
      success.classList.remove("hidden");
      form.classList.add("hidden");
    }, 600);
  });
}

const updateStep = () => {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
  prevBtn.classList.toggle("hidden", currentStep === 0);
  if (currentStep === steps.length - 1) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
};

const validateStep = () => {
  const activeStep = steps[currentStep];
  if (!activeStep) return true;
  const inputs = activeStep.querySelectorAll("input[required]");
  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return false;
    }
  }
  return true;
};

if (steps.length) {
  updateStep();
  nextBtn.addEventListener("click", () => {
    if (!validateStep()) return;
    currentStep = Math.min(currentStep + 1, steps.length - 1);
    updateStep();
  });
  prevBtn.addEventListener("click", () => {
    currentStep = Math.max(currentStep - 1, 0);
    updateStep();
  });
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-item");
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

navItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (window.innerWidth <= 900) {
      event.preventDefault();
      item.classList.toggle("open");
    }
  });
});

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

const newsletterModal = document.getElementById("newsletter-modal");
const newsletterTrigger = document.querySelector(".newsletter-trigger");
const modalClose = document.querySelector(".modal-close");
const newsletterForm = document.getElementById("newsletter-form");
const newsletterSuccess = document.getElementById("newsletter-success");

const showNewsletter = () => {
  if (!newsletterModal) return;
  if (localStorage.getItem("newsletterDismissed")) return;
  newsletterModal.classList.remove("hidden");
  newsletterModal.setAttribute("aria-hidden", "false");
};

if (newsletterTrigger) {
  newsletterTrigger.addEventListener("click", () => showNewsletter());
}

if (modalClose && newsletterModal) {
  modalClose.addEventListener("click", () => {
    newsletterModal.classList.add("hidden");
    newsletterModal.setAttribute("aria-hidden", "true");
    localStorage.setItem("newsletterDismissed", "true");
  });
}

if (newsletterModal) {
  newsletterModal.addEventListener("click", (event) => {
    if (event.target === newsletterModal) {
      newsletterModal.classList.add("hidden");
      newsletterModal.setAttribute("aria-hidden", "true");
      localStorage.setItem("newsletterDismissed", "true");
    }
  });
  const modalTimer = setTimeout(showNewsletter, 8000);
  if (localStorage.getItem("newsletterDismissed")) {
    clearTimeout(modalTimer);
  }
}

if (newsletterForm && newsletterModal) {
  newsletterForm.addEventListener("submit", () => {
    if (newsletterSuccess) {
      newsletterSuccess.style.display = "block";
    }
    setTimeout(() => {
      newsletterModal.classList.add("hidden");
      newsletterModal.setAttribute("aria-hidden", "true");
      localStorage.setItem("newsletterDismissed", "true");
    }, 800);
  });
}
