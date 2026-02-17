// ══════════════════════════════════════════════════
//  PORTFOLIO — Main JavaScript
// ══════════════════════════════════════════════════

// ─── Navbar shadow on scroll ─────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ─── Mobile menu toggle ─────────────────────────
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const icon = navToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const icon = navToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// ─── Smooth scroll for anchor links ──────────────
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ─── Active nav highlighting ─────────────────────
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((a) => a.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`,
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { threshold: 0.35 },
);

sections.forEach((s) => sectionObserver.observe(s));

// ─── Scroll-triggered animations ─────────────────
const animateOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  animateOnScroll.observe(el);
});

// ─── Project Filtering ───────────────────────────
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");

    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Filter cards — only animate cards that were previously hidden
    projectCards.forEach((card) => {
      const tags = card.getAttribute("data-tags") || "";
      const show = category === "all" || tags.includes(category);
      const wasHidden = card.style.display === "none";

      if (show) {
        card.style.display = "";
        if (wasHidden) {
          // Only fade in cards that are newly appearing
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

// ─── Certificates "Show More" toggle ─────────────
const certToggleBtn = document.getElementById("cert-toggle-btn");
const certHidden = document.getElementById("cert-hidden");

if (certToggleBtn && certHidden) {
  certToggleBtn.addEventListener("click", () => {
    const isVisible = certHidden.classList.toggle("show");
    const icon = certToggleBtn.querySelector("i");

    if (isVisible) {
      certToggleBtn.innerHTML =
        '<i class="fa-solid fa-chevron-up"></i> Show Less';
      // Animate newly visible cards
      certHidden.querySelectorAll(".animate-on-scroll").forEach((el) => {
        animateOnScroll.observe(el);
      });
    } else {
      certToggleBtn.innerHTML =
        '<i class="fa-solid fa-chevron-down"></i> Show 7 More';
    }
  });
}

// ─── Contact Form with Fetch ─────────────────────
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
        showFormMessage("Message sent successfully! ✓", "success");
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
  // Remove any existing message
  const existing = form.querySelector(".form-message");
  if (existing) existing.remove();

  const el = document.createElement("p");
  el.className = `form-message ${type}`;
  el.textContent = msg;
  form.appendChild(el);
  setTimeout(() => el.remove(), 5000);
}
