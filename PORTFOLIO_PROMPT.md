# Portfolio Generation Prompt

**Goal**: Create a brand new personal portfolio website from scratch using **Vanilla HTML, CSS, and TypeScript**.
**Content Source**: Use the **Resume Content** provided at the bottom of this prompt to populate all sections (About, Experience, Projects, Skills, Contact).

## Technical Requirements

- **Stack**: HTML5, CSS3, TypeScript.
- **No Frameworks**: Do not use React, Vue, or heavy libraries. Pure DOM manipulation only.
- **Build Tool**: Vite (Vanilla TS template) or simple `tsc`.
- **Styling**:
  - Use **CSS Variables** for the design system.
  - **Dark Mode** by default.
  - **Glassmorphism**: Use `backdrop-filter: blur()` for cards and navbars.
  - **Animations**: CSS Transitions, `@keyframes`, or Web Animations API.

## Design System

- **Fonts**: 'Inter' and 'Poppins' (Google Fonts).
- **Colors** (HSL):
  - Background: `hsl(215, 28%, 8%)` (Deep Blue)
  - Text: `hsl(180, 10%, 95%)` (Off-white)
  - Primary/Accent: `hsl(188, 95%, 65%)` (Cyan)
  - Card Background: `hsl(217, 25%, 12%)`
  - Muted Text: `hsl(180, 10%, 65%)`
  - Gradient: `hsl(215, 28%, 8%)` to `hsl(188, 95%, 40%)`

## Layout Structure

1.  **Navigation**: Fixed top bar with blur effect. Links: Home, About, Experience, Projects, Skills, Contact.
2.  **Hero Section**:
    - Large Name & Title from Resume.
    - Short bio/summary.
    - "Download Resume" button.
    - Social Links (GitHub, LinkedIn, Email).
3.  **About Section**: Detailed summary from resume.
4.  **Experience Section**: Timeline or cards showing work history (Role, Company, Date, Bullets).
5.  **Projects Section**: Grid of project cards (Title, Description, Tech Stack, Link).
6.  **Skills Section**: Categorized skills (Technical, Tools, Soft Skills).
7.  **Contact Section**: Email link and simple contact form.
8.  **Footer**: Copyright & Credits.

## Implementation Steps

1.  **Setup**: Initialize `index.html`, `style.css`, `main.ts`.
2.  **HTML Structure**: Create semantic sections for all content found in the resume.
3.  **CSS Styling**: Apply the dark theme, variables, and glassmorphism classes.
4.  **TypeScript**: Add interactivity (mobile menu toggle, smooth scrolling, simple form handling).

---

## [PASTE RESUME CONTENT HERE]

(Paste your full resume text below this line for the AI to process)
