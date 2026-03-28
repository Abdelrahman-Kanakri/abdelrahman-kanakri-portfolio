# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Abdelrahman Kanakri (Data Scientist & AI Engineer). This is a **zero-build, static site** — no bundler, no framework, no package manager.

## Development

No build step or dependencies. Serve locally with any static server:

```bash
python -m http.server 3000
# or
npx serve .
```

Then open `http://localhost:3000` in a browser.

## Architecture

Single-page site with three source files:

- **index.html** — All sections inline (Hero, About, Services, Experience, Projects, Skills, Certificates, Contact). Content is static HTML, not templated.
- **style.css** — All styling via CSS custom properties. Uses glassmorphism, scroll-triggered animations (`.animate-on-scroll` / `.visible`), and responsive breakpoints.
- **main.js** — Vanilla ES6+ with no dependencies. Handles: navbar scroll shadow, mobile menu toggle, smooth anchor scrolling, active nav highlighting via `IntersectionObserver`, scroll-reveal animations via `IntersectionObserver`, project card filtering by `data-tags` attribute, certificate show/hide toggle, and contact form submission via Fetch to Formspree.

## Key Patterns

- **Scroll animations**: Elements with class `animate-on-scroll` get class `visible` added when they enter the viewport. CSS transitions handle the visual effect.
- **Project filtering**: Filter buttons use `data-category` attributes; project cards use `data-tags`. Filtering is purely display-based (`style.display`).
- **Contact form**: Posts to Formspree endpoint defined in the form's `action` attribute. Uses `FormData` with JSON accept header.
- **External CDNs**: Font Awesome 6, Devicon, and Google Fonts (Poppins + Inter) are loaded from CDNs — no local copies.

## Content Files (gitignored)

`PORTFOLIO_CONTENT.md`, `SKILL.md`, and `PORTFOLIO_PROMPT.md` are reference/prompt files used during initial site generation. They are gitignored and not part of the deployed site.
