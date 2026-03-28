// ══════════════════════════════════════════════════
//  PORTFOLIO — Main JavaScript (Modern Redesign)
// ══════════════════════════════════════════════════

// ─── Custom Cursor ──────────────────────────────
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

function animateCursorRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";
  requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Cursor hover state on interactive elements
const hoverTargets = document.querySelectorAll("a, button, .filter-btn, .btn, .badge, .skill-node, .project-card");
hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.classList.add("hovering");
    cursorRing.classList.add("hovering");
  });
  el.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("hovering");
    cursorRing.classList.remove("hovering");
  });
});

// ─── Magnetic Effect ────────────────────────────
const magneticEls = document.querySelectorAll(".magnetic");

magneticEls.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

// ─── Scroll Progress Bar ────────────────────────
const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + "%";
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });

// ─── Navbar shadow on scroll ────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

// ─── Mobile menu toggle ─────────────────────────
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const icon = navToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const icon = navToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// ─── Smooth scroll for anchor links ─────────────
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ─── Active nav + side dot highlighting ─────────
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const sideDots = document.querySelectorAll(".side-dot");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        // Top nav
        navItems.forEach((a) => a.classList.remove("active"));
        const activeNav = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeNav) activeNav.classList.add("active");
        // Side dots
        sideDots.forEach((d) => d.classList.remove("active"));
        const activeDot = document.querySelector(`.side-dot[href="#${id}"]`);
        if (activeDot) activeDot.classList.add("active");
      }
    });
  },
  { threshold: 0.3 },
);

sections.forEach((s) => sectionObserver.observe(s));

// ─── Scroll-triggered animations (staggered) ───
const animateOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  animateOnScroll.observe(el);
});

// ─── Hero: Split Character Animation ────────────
function splitChars() {
  document.querySelectorAll(".split-chars").forEach((el) => {
    const text = el.textContent;
    const baseDelay = parseInt(el.dataset.delay) || 0;
    el.textContent = "";
    el.style.opacity = "1";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = baseDelay + i * 40 + "ms";
      el.appendChild(span);
    });
  });
}
splitChars();

// ─── Hero: Typewriter Effect ────────────────────
function typewriter() {
  const el = document.querySelector(".typewriter");
  if (!el) return;
  const text = el.dataset.text;
  let i = 0;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 60);
    }
  }
  // Start after name animation finishes
  setTimeout(type, 1200);
}
typewriter();

// ─── Hero: Stagger Reveal ───────────────────────
document.querySelectorAll(".stagger-reveal").forEach((el) => {
  const delay = parseInt(el.dataset.delay) || 0;
  setTimeout(() => {
    el.classList.add("visible");
  }, delay);
});

// ─── 3D Tilt Effect on Project Cards ────────────
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    // Update spotlight position
    const spotlight = card.querySelector(".card-spotlight");
    if (spotlight) {
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      spotlight.style.setProperty("--mouse-x", percentX + "%");
      spotlight.style.setProperty("--mouse-y", percentY + "%");
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ─── Project Filtering ──────────────────────────
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");

    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const tags = card.getAttribute("data-tags") || "";
      const show = category === "all" || tags.includes(category);
      const wasHidden = card.style.display === "none";

      if (show) {
        card.style.display = "";
        if (wasHidden) {
          card.classList.remove("visible");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add("visible");
            });
          });
        }
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ─── Certificates "Show More" toggle ────────────
const certToggleBtn = document.getElementById("cert-toggle-btn");
const certHidden = document.getElementById("cert-hidden");

if (certToggleBtn && certHidden) {
  certToggleBtn.addEventListener("click", () => {
    const isVisible = certHidden.classList.toggle("show");

    if (isVisible) {
      certToggleBtn.innerHTML =
        '<i class="fa-solid fa-chevron-up"></i> Show Less';
      certHidden.querySelectorAll(".animate-on-scroll").forEach((el) => {
        animateOnScroll.observe(el);
      });
    } else {
      certToggleBtn.innerHTML =
        '<i class="fa-solid fa-chevron-down"></i> Show 7 More';
    }
  });
}

// ─── Contact Form with Fetch ────────────────────
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showFormMessage("Message sent successfully!", "success");
        form.reset();
      } else {
        showFormMessage("Something went wrong. Please try again.", "error");
      }
    } catch {
      showFormMessage("Network error. Please try again.", "error");
    } finally {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }
  });
}

function showFormMessage(msg, type) {
  const existing = form.querySelector(".form-message");
  if (existing) existing.remove();

  const el = document.createElement("p");
  el.className = `form-message ${type}`;
  el.textContent = msg;
  form.appendChild(el);
  setTimeout(() => el.remove(), 5000);
}
