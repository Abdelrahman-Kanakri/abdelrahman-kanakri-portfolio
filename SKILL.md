---
name: vanilla-portfolio
description: >
  Use this skill any time a user wants to create a personal portfolio website using
  Vanilla HTML, CSS, and TypeScript (no React, Vue, or heavy frameworks). Triggers include:
  "build me a portfolio", "create a portfolio site", "make a personal website", any request
  referencing a portfolio for a data scientist, developer, designer, or engineer. Also use
  when the user provides a PORTFOLIO_CONTENT.md, resume file, or raw personal content and
  asks for a website. The deliverable is always a single self-contained index.html file
  plus optional style.css and main.ts (or compiled main.js), ready to open in a browser.
---

# Vanilla Portfolio Skill

## Quick Reference

| Task | Action |
|------|--------|
| Understand content | Read PORTFOLIO_CONTENT.md or resume file provided by user |
| Plan sections | Map content → Hero, About, Experience, Projects, Skills, Certificates, Contact |
| Build structure | Write semantic `index.html` with all sections |
| Apply design system | Write `style.css` with CSS variables, glassmorphism, animations |
| Add interactivity | Write `main.ts` (or inline `<script>`) for nav, scroll, form |
| QA | Open file in browser mentally; check layout, links, responsiveness |

---

## Step 0 — Read the Content File First

Before writing a single line of code, extract and organize all data from the provided file(s):

```
1. Name, title, tagline / bio
2. Social links (GitHub, LinkedIn, Kaggle, Email, etc.)
3. Education (degree, institution, year)
4. Work experience (role, company, dates, bullet points)
5. Projects (name, description, tags/tech, URL)
6. Skills (technical, tools, soft)
7. Certificates (name, issuer, date)
8. Contact info (email, phone, form endpoint if any)
```

Map every piece of content to one of the 8 layout sections below. Do not invent content — only use what was provided.

---

## Step 1 — Choose a Design Direction

Pick ONE strong aesthetic direction before writing any code. The portfolio must feel **designed for this specific person's field**, not generic.

| Field | Suggested Aesthetic |
|-------|---------------------|
| Data Scientist / AI Engineer | Deep-space dark, cyan/teal accent, technical/precise |
| Frontend / UI Developer | Bold editorial, vivid color, playful typography |
| Backend / Systems Engineer | Terminal-inspired, monospace, minimal |
| Designer | White-space heavy, elegant serif, gradient-free |
| Full-Stack | Clean dark, gradient accents, glassmorphism |

**Commit to the aesthetic.** This means:
- One dominant background color (dark recommended for tech roles)
- One sharp accent color (neon cyan, electric violet, warm gold — not generic blue)
- One display font (for headings) + one body font (for paragraphs)
- A recurring visual motif (glowing cards, grid lines, dot patterns, gradient orbs)

**NEVER use:**
- Purple gradients on white (generic AI aesthetic)
- All gray / no accent colors
- Arial, Roboto, or system fonts as the display font
- Identical card styles everywhere with no visual hierarchy

---

## Step 2 — Design System (CSS Variables)

Always define a design system at the top of `style.css` using CSS custom properties:

```css
:root {
  /* — Color Palette — */
  --bg-primary:      hsl(215, 28%, 8%);   /* deep dark background */
  --bg-secondary:    hsl(217, 25%, 12%);  /* card/section background */
  --bg-glass:        hsla(217, 25%, 15%, 0.6); /* glassmorphism base */
  --accent:          hsl(188, 95%, 65%);  /* primary accent (cyan) */
  --accent-dim:      hsl(188, 60%, 35%);  /* darker accent for gradients */
  --text-primary:    hsl(180, 10%, 95%);  /* main text */
  --text-muted:      hsl(180, 10%, 60%);  /* secondary text */
  --border:          hsla(188, 50%, 50%, 0.15); /* subtle borders */

  /* — Typography — */
  --font-display:    'Poppins', sans-serif;
  --font-body:       'Inter', sans-serif;

  /* — Spacing Scale — */
  --space-xs:   0.25rem;
  --space-sm:   0.5rem;
  --space-md:   1rem;
  --space-lg:   2rem;
  --space-xl:   4rem;
  --space-2xl:  6rem;

  /* — Effects — */
  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --shadow-glow: 0 0 30px hsla(188, 95%, 65%, 0.15);
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
  --blur-glass:  blur(12px);
  --transition:  all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Adapt these values to the chosen aesthetic.** For a warmer palette, shift the HSL values. For a light theme, invert `--bg-primary` and `--text-primary`.

---

## Step 3 — HTML Structure

Use semantic HTML5 with `id` attributes matching the nav links:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{Name} — {Title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- NAVIGATION -->
  <nav id="navbar">
    <div class="nav-container">
      <a href="#home" class="nav-brand">{FirstName}</a>
      <button class="nav-toggle" aria-label="Toggle menu">☰</button>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <!-- HERO -->
  <section id="home" class="hero">...</section>

  <!-- ABOUT -->
  <section id="about" class="about">...</section>

  <!-- EXPERIENCE -->
  <section id="experience" class="experience">...</section>

  <!-- PROJECTS -->
  <section id="projects" class="projects">...</section>

  <!-- SKILLS -->
  <section id="skills" class="skills">...</section>

  <!-- CERTIFICATES (optional, if data exists) -->
  <section id="certificates" class="certificates">...</section>

  <!-- CONTACT -->
  <section id="contact" class="contact">...</section>

  <!-- FOOTER -->
  <footer class="footer">...</footer>

  <script src="main.js"></script>
</body>
</html>
```

---

## Step 4 — Section-by-Section Implementation

### 4.1 Navigation

- **Fixed** to top, full width
- **Glassmorphism**: `background: var(--bg-glass); backdrop-filter: var(--blur-glass);`
- **Active state**: highlight the section currently in viewport
- **Mobile**: hamburger button toggles a dropdown or slide-in menu
- Add `box-shadow` on scroll: JS adds a `.scrolled` class to `<nav>`

```css
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: var(--bg-glass);
  backdrop-filter: var(--blur-glass);
  border-bottom: 1px solid var(--border);
  transition: var(--transition);
}
nav.scrolled {
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
```

---

### 4.2 Hero Section

Must contain:
- Large name (display font, 3rem–5rem, gradient text or accent color)
- Subtitle / role title (muted, 1.2rem–1.6rem)
- 2–3 sentence bio
- CTA buttons: "Download Resume" + "View Projects"
- Social icons row (GitHub, LinkedIn, Kaggle, Email)
- **Optional decorative element**: floating tech-stack badges (animate with CSS `@keyframes float`), gradient orb in background, animated grid lines

**Gradient text technique:**
```css
.hero-name {
  background: linear-gradient(135deg, var(--accent), hsl(280, 80%, 70%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Floating badge animation:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50%       { transform: translateY(-12px) rotate(2deg); }
}
.badge { animation: float 4s ease-in-out infinite; }
.badge:nth-child(2) { animation-delay: 0.8s; }
.badge:nth-child(3) { animation-delay: 1.6s; }
```

---

### 4.3 About Section

Two-column layout (text left, info cards right):
- Left: heading + 2–3 paragraph bio
- Right: Education card + quick-stat cards (e.g., "3+ Years Experience", "8 Projects")

Glassmorphism card:
```css
.glass-card {
  background: var(--bg-glass);
  backdrop-filter: var(--blur-glass);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--space-lg);
}
```

---

### 4.4 Experience Section

Use a **vertical timeline** layout:
- Central line (thin, accent-colored)
- Alternating left/right cards (or all-left on mobile)
- Each card: Role title, Company, Date range, bullet points
- Timeline dot: colored circle on the central line

```css
.timeline {
  position: relative;
  padding-left: 2rem;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), transparent);
}
.timeline-item {
  position: relative;
  margin-bottom: var(--space-lg);
  padding-left: var(--space-lg);
}
.timeline-dot {
  position: absolute;
  left: -0.45rem;
  top: 0.4rem;
  width: 12px; height: 12px;
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--accent);
}
```

---

### 4.5 Projects Section

**CSS Grid** with 2–3 columns (responsive: 1 on mobile, 2 on tablet, 3 on desktop):

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
}
```

Each project card must include:
- Project title
- Short description (max 2–3 lines, `overflow: hidden`)
- Tag pills (accent background, small font)
- Link button (GitHub / Kaggle / Live Demo)
- **Hover effect**: card lifts (`transform: translateY(-6px)`), glow border appears

```css
.project-card {
  transition: var(--transition);
  border: 1px solid var(--border);
}
.project-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
  box-shadow: var(--shadow-glow);
}
```

**Filter bar** (optional but recommended if 6+ projects):
Add category buttons (`All`, `ML`, `NLP`, `Computer Vision`, etc.) that filter cards via JS.

---

### 4.6 Skills Section

Three category columns: Technical, Tools, Soft Skills.

For technical skills, use **animated skill bars** or **pill clouds**:

**Pill cloud (recommended — simpler and more visual):**
```css
.skill-pill {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.85rem;
  color: var(--text-primary);
  transition: var(--transition);
}
.skill-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 0 10px hsla(188, 95%, 65%, 0.2);
}
```

**Animated progress bars (for key skills):**
```css
.skill-bar-fill {
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--accent-dim));
  width: 0%;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```
Animate on scroll using Intersection Observer (see Step 5).

---

### 4.7 Certificates Section (if data exists)

Simple scrollable list or 3-column grid of small cards:
- Certificate name (bold)
- Issuer + date (muted)
- Optional: small icon or badge

If there are many certificates (10+), consider a **2-column accordion** or a scrollable list with a "Show More" toggle.

---

### 4.8 Contact Section

Split layout:
- Left: heading, intro text, contact info (email, phone, LinkedIn, GitHub) with icons
- Right: contact form

Form fields: Name, Email, Subject, Message, Submit button.

**Form endpoint**: If a Formspree URL is provided in the content, use it as the `action` attribute. Otherwise use a `<form>` with JS `fetch()` call.

```html
<form id="contact-form" action="https://formspree.io/f/XXXXXXXX" method="POST">
  <input type="text"     name="name"    placeholder="Your Name"    required />
  <input type="email"    name="email"   placeholder="Your Email"   required />
  <input type="text"     name="subject" placeholder="Subject"      required />
  <textarea              name="message" placeholder="Your message" required rows="5"></textarea>
  <button type="submit">Send Message</button>
</form>
```

Add success/error state handling in TypeScript.

---

### 4.9 Footer

Minimal: centered text, name, year, social links row.

```html
<footer class="footer">
  <p>© 2025 {Name}. Built with ❤️</p>
  <div class="footer-links">
    <a href="...">GitHub</a>
    <a href="...">LinkedIn</a>
    <a href="mailto:...">Email</a>
  </div>
</footer>
```

---

## Step 5 — TypeScript Interactivity

Create `main.ts` with the following features:

### 5.1 Navigation

```typescript
// Navbar shadow on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar')!;
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector((link as HTMLAnchorElement).getAttribute('href')!);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle')!;
const navLinks = document.querySelector('.nav-links')!;
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
```

### 5.2 Active Nav Highlighting

```typescript
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      document.querySelector(`.nav-links a[href="#${entry.target.id}"]`)
              ?.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
```

### 5.3 Scroll-Triggered Animations

```typescript
// Add .visible class when elements enter viewport
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars if present
      if (entry.target.classList.contains('skill-bar-fill')) {
        const width = entry.target.getAttribute('data-width')!;
        (entry.target as HTMLElement).style.width = width;
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll, .skill-bar-fill')
  .forEach(el => animateOnScroll.observe(el));
```

CSS for `.animate-on-scroll`:
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 5.4 Project Filtering (if implemented)

```typescript
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category')!;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.project-card').forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const show = category === 'all' || tags.includes(category);
      (card as HTMLElement).style.display = show ? 'block' : 'none';
    });
  });
});
```

### 5.5 Contact Form with Fetch

```typescript
const form = document.getElementById('contact-form') as HTMLFormElement;
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      showFormMessage('Message sent successfully! ✓', 'success');
      form.reset();
    } else {
      showFormMessage('Something went wrong. Please try again.', 'error');
    }
  } catch {
    showFormMessage('Network error. Please try again.', 'error');
  } finally {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
});

function showFormMessage(msg: string, type: 'success' | 'error') {
  const el = document.createElement('p');
  el.className = `form-message ${type}`;
  el.textContent = msg;
  form.appendChild(el);
  setTimeout(() => el.remove(), 5000);
}
```

---

## Step 6 — Responsive Design

Always include these breakpoints:

```css
/* Tablet */
@media (max-width: 1024px) {
  .about-grid    { grid-template-columns: 1fr; }
  .hero-content  { flex-direction: column; text-align: center; }
}

/* Mobile */
@media (max-width: 768px) {
  .nav-links     { display: none; flex-direction: column; }
  .nav-links.open { display: flex; }
  .nav-toggle    { display: block; }
  .projects-grid { grid-template-columns: 1fr; }
  .hero-name     { font-size: 2.2rem; }
  section        { padding: var(--space-xl) var(--space-md); }
}
```

---

## Step 7 — Performance & Polish

### Loading Performance
- Use `loading="lazy"` on all images
- Preconnect to Google Fonts in `<head>`
- Keep external dependencies minimal (no jQuery, no Bootstrap)

### Accessibility
- All `<img>` tags must have `alt` text
- Interactive elements need `:focus-visible` styles
- Sufficient color contrast (WCAG AA: 4.5:1 for normal text)

### Micro-details that elevate quality
- Cursor changes on interactive cards (`cursor: pointer`)
- Subtle `letter-spacing: 0.05em` on uppercase labels
- Tag pills with a slight `font-weight: 500` (not bold, not thin)
- Section headings with a short colored underline accent (`::after` pseudo-element)
- Consistent section padding (use `--space-2xl` top/bottom)

---

## Step 8 — File Delivery

### Option A: Single HTML File (recommended for Claude artifacts)

Inline all CSS in `<style>` and all JS in `<script>` at the bottom of `index.html`. This creates a fully self-contained file that works by opening it directly.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  ...
  <style>/* all CSS here */</style>
</head>
<body>
  ...
  <script>/* all JS/TS compiled to JS here */</script>
</body>
</html>
```

### Option B: Multi-file (for downloadable project)

```
/portfolio/
  index.html
  style.css
  main.js          ← compiled from main.ts
  assets/
    resume.pdf
```

Copy final files to `/mnt/user-data/outputs/` and present to user.

---

## Common Mistakes to Avoid

- **Don't create sections with no content** — if the user didn't provide certificates, omit the section
- **Don't use placeholder images** — use CSS gradient backgrounds or SVG icons instead
- **Don't make all sections the same visual weight** — vary background colors subtly (alternate `--bg-primary` and `--bg-secondary`)
- **Don't forget the mobile menu** — every portfolio will be viewed on phones
- **Don't put skill percentages you made up** — if no percentages are given, use pill clouds instead of progress bars
- **Don't make links non-functional** — every project link must use the actual URL from the content file
- **Don't forget the form endpoint** — if Formspree URL is provided, use it; otherwise use `mailto:` fallback
- **Don't center-align body paragraphs** — center only hero text; left-align everything else
- **Don't use emoji in section titles** — keep headings professional

---

## QA Checklist

Before delivering, verify:

- [ ] All sections present: Nav, Hero, About, Experience, Projects, Skills, Contact, Footer
- [ ] All names, titles, companies, dates match the content file exactly
- [ ] All project links point to actual URLs (no `#` placeholders)
- [ ] Social links (GitHub, LinkedIn, Email, Kaggle) are correct
- [ ] Mobile nav toggle works (hamburger menu)
- [ ] Smooth scrolling works on all nav links
- [ ] Active nav highlight updates on scroll
- [ ] Skill bars / pills render correctly
- [ ] Project cards have hover effects
- [ ] Contact form has a real action URL or mailto fallback
- [ ] No Lorem Ipsum, no placeholder text remaining
- [ ] Fonts load from Google Fonts
- [ ] Page looks good at 1440px, 1024px, 768px, 375px widths
- [ ] All text passes contrast check against background

---

## Reference Design Tokens (Dark Tech / Data Science)

These tokens match the aesthetic specified in the prompt for data scientist portfolios:

```
Background:  hsl(215, 28%, 8%)   → near-black deep blue
Cards:       hsl(217, 25%, 12%)  → slightly lighter, for glass effect
Accent:      hsl(188, 95%, 65%)  → electric cyan
Accent dark: hsl(188, 60%, 35%)  → for gradients
Text:        hsl(180, 10%, 95%)  → warm off-white
Muted:       hsl(180, 10%, 60%)  → secondary text, dates, labels
Border:      hsla(188, 50%, 50%, 0.15) → subtle glowing borders
```

Alternate accent options for variety:
```
Electric Purple:  hsl(270, 90%, 70%)
Warm Gold:        hsl(42, 95%, 60%)
Neon Green:       hsl(150, 85%, 55%)
Coral:            hsl(15, 90%, 65%)
```
