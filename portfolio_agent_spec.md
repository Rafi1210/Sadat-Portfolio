# Portfolio Website Agent Specification
## Md. Sadat Ahmed Rafi

> **Purpose:** This document is the complete implementation brief for an AI coding agent. Build the portfolio as a polished, production-ready React + Vite + Tailwind CSS website with multiple pages, strong visual storytelling, smooth animation, responsive behavior, accessibility, and project-specific detail pages.

---

# 1. Core Objective

Build a **modern personal portfolio website** for **Md. Sadat Ahmed Rafi**, a CSE undergraduate at East West University.

The current portfolio exists as a single static HTML page. That HTML should be treated as the **primary content/reference source**, but the new implementation should substantially improve the architecture, responsiveness, UX, visual polish, animations, and project presentation.

The existing source establishes the following identity and content direction:

- Name: **Md. Sadat Ahmed Rafi**
- CSE undergraduate at **East West University**
- Location: **Dhaka, Bangladesh**
- Positioning:
  - Frontend Developer
  - AI/ML Engineer
  - Competitive Programmer
  - Technical Event Organizer
  - Robotics Club Leader
- EWU Robotics Club leadership
- Software, AI/ML, optimization, research, competitive programming, and event-management interests
- Portfolio projects including Dropify, CaseLaw RAG System, Spotify Recommendation System, TraceQ, NRF26 Event Platform, and IoT Smart Monitoring System
- GitHub: `Rafi1210`
- Codeforces: `Rafi1210`
- LinkedIn: `sadat-ahmed-rafi`
- Email: `sadatahmedrafi12@gmail.com`

The original HTML also contains the existing project descriptions, skills, experience, achievements, research interests, certifications, contact information, and Codeforces integration. Preserve factual content unless explicitly changed by the owner.

---

# 2. Important Design Direction

The new website should **not simply be a React conversion of the old HTML**.

The target is:

> **Minimal + premium + editorial + futuristic + soft + highly interactive**

Avoid the common "developer portfolio template" look.

Do NOT create:
- excessive neon colors
- overly dark cyberpunk styling
- huge gradients everywhere
- excessive glassmorphism
- generic three-column template sections
- unnecessary floating UI
- excessive particle effects
- animations that make the site feel slow
- giant text that destroys mobile usability

The design should feel like a portfolio designed by a strong product designer.

---

# 3. Visual Theme

## Primary direction

Use a **very light, smooth color system**.

Recommended foundation:

- Background: warm/off-white or very light neutral
- Surface: white / translucent white
- Primary text: near-black charcoal
- Secondary text: muted gray
- Accent: one restrained soft accent color
- Borders: extremely subtle
- Shadows: soft and diffused
- Gradients: very subtle and mostly atmospheric

Suggested palette:

```text
Background      #F7F8FA
Surface         #FFFFFF
Surface Soft    #F1F3F5
Text            #111318
Text Secondary  #5F6673
Text Muted      #8A919D
Border          #E6E8EC
Accent          #6C63FF or another single soft modern accent
Accent Soft     very low-opacity version of accent
```

The exact accent may be adjusted during implementation if a better visual system is found.

### Important

The website should look excellent even without the accent color.

The hierarchy must come primarily from:
- typography
- spacing
- layout
- scale
- contrast
- motion
- imagery

---

# 4. Tech Stack

Use:

- React
- Vite
- Tailwind CSS
- JavaScript or TypeScript
- React Router
- Framer Motion
- Lucide React icons

Recommended optional libraries:

- `lenis` for smooth scrolling
- `clsx` / `tailwind-merge` for class composition
- `react-intersection-observer` if useful
- `motion` if preferred over Framer Motion

Do not introduce libraries just for decoration.

---

# 5. Project Architecture

Use a clean scalable architecture.

Recommended:

```text
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── documents/
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── MobileMenu.jsx
│   │   └── PageTransition.jsx
│   │
│   ├── common/
│   │   ├── SectionHeading.jsx
│   │   ├── MagneticButton.jsx
│   │   ├── Reveal.jsx
│   │   ├── Badge.jsx
│   │   ├── TechStack.jsx
│   │   ├── ProjectCard.jsx
│   │   └── SocialLinks.jsx
│   │
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── Intro.jsx
│   │   ├── FeaturedProjects.jsx
│   │   ├── ExperiencePreview.jsx
│   │   ├── SkillsPreview.jsx
│   │   └── ContactCTA.jsx
│   │
│   └── projects/
│       ├── ProjectHero.jsx
│       ├── ProjectOverview.jsx
│       ├── ProjectGallery.jsx
│       ├── ProjectArchitecture.jsx
│       ├── ProjectFeatures.jsx
│       ├── ProjectChallenges.jsx
│       └── ProjectNavigation.jsx
│
├── data/
│   ├── projects.js
│   ├── experience.js
│   ├── skills.js
│   ├── achievements.js
│   └── certifications.js
│
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── ProjectDetails.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   └── Contact.jsx
│
├── hooks/
│   ├── useScrollProgress.js
│   ├── useMousePosition.js
│   └── useMediaQuery.js
│
├── lib/
│   └── utils.js
│
├── App.jsx
├── main.jsx
└── index.css
```

Keep content data-driven.

Do not hardcode every project card directly into JSX.

---

# 6. Routing

Use React Router.

Required routes:

```text
/
 /projects
 /projects/dropify
 /projects/caselaw-rag
 /projects/spotify-recommendation
 /projects/traceq
 /projects/nrf26
 /projects/iot-monitoring
 /about
 /experience
 /contact
```

Project pages should use reusable components and project data.

Prefer a data-driven route such as:

```text
/projects/:slug
```

rather than creating six completely independent project-page implementations.

---

# 7. Navigation

Desktop navbar:

- Rafi / RAFI. logo
- Home
- Projects
- About
- Experience
- Contact
- Resume button

The navbar should:

- be transparent/clean at the top
- become a subtle floating/sticky surface while scrolling
- use backdrop blur carefully
- have smooth active-state transitions
- not occupy excessive vertical space

Mobile:

- hamburger menu
- animated menu panel
- large touch targets
- close automatically after navigation
- no desktop navigation overflow

The navigation must work on:
- 320px mobile
- 375px
- 414px
- tablets
- laptops
- large desktop screens

---

# 8. Landing / Home Page

The landing page is the most important part.

It should immediately communicate:

1. Who Rafi is
2. What he builds
3. What he is interested in
4. Why someone should explore the portfolio

## Hero concept

Use a large editorial hero.

Example structure:

```text
[small status badge]

Md. Sadat
Ahmed Rafi

I build thoughtful digital products,
intelligent systems, and real-world solutions.

[View Projects] [Contact Me]

React • FastAPI • Python • AI/ML • Systems
```

Do not blindly copy this wording. Use it as direction.

The hero should feel spacious and premium.

---

# 9. Hero Animation

Use subtle high-quality motion.

Recommended sequence:

1. Page loads
2. Small badge fades/slides upward
3. Name reveals line by line
4. Description appears
5. CTA buttons appear
6. Supporting visual appears with slight scale/fade
7. Background atmospheric element slowly moves

Use Framer Motion.

Animation should feel:
- smooth
- intentional
- fast enough
- non-distracting

Avoid:
- bouncing
- excessive spring effects
- constant animation everywhere

---

# 10. Hero Visual

Instead of the old static information card, create a more modern visual element.

Possible concept:

A floating "digital profile / activity" panel containing:

```text
RAFI
Software Engineer / Builder

Currently:
Building systems

Focus:
Web • AI • Optimization

Based in:
Dhaka, Bangladesh
```

This can have:
- subtle glass/blur
- tiny motion
- soft gradient
- animated border
- small orbiting visual element

Do not make it visually heavier than the typography.

---

# 11. Custom Cursor

The old portfolio uses a neon cursor.

The new site should use a **much softer cursor interaction** on desktop.

Possible behavior:

- small dot
- subtle trailing circle
- slightly expands over links
- changes appearance over project cards
- disappears on touch devices

Never force a custom cursor on mobile.

Respect:

```css
@media (pointer: coarse)
```

or equivalent JS detection.

---

# 12. Scroll Experience

Use smooth scrolling.

Recommended:

- Lenis or native smooth scrolling
- scroll progress indicator
- section reveal animations
- subtle parallax only where useful

Do not make every element move independently.

Motion should establish hierarchy.

---

# 13. Home Page Sections

Recommended order:

```text
Hero
↓
Featured Projects
↓
Short About / Intro
↓
Selected Experience
↓
Technical Stack
↓
Leadership / Achievements
↓
Research / Interests
↓
Final CTA
↓
Footer
```

The old HTML has many sections. The new home page should be more selective.

Do not dump every piece of information onto the landing page.

The goal is to make the visitor want to explore the dedicated pages.

---

# 14. Featured Projects

Projects are one of the strongest parts of the portfolio.

Use large editorial project cards.

Each card should contain:

- project number
- project title
- short description
- category
- technologies
- project image/visual
- GitHub link if available
- live/demo link if available
- "View Case Study" action

Use asymmetric layouts.

Example:

```text
01
DROPIFY

Smart Last-Mile Delivery

A route optimization platform...

[large project visual]

React • FastAPI • PostgreSQL • PostGIS
```

Then alternate the visual alignment for subsequent projects.

---

# 15. Project Detail Pages

This is a major requirement.

Every major project should have its own detailed page.

Do NOT use a generic card-only modal.

A project page should feel like a **mini case study**.

## Project page structure

```text
Project Hero
↓
Project metadata
↓
Overview
↓
Problem
↓
Solution
↓
How it works
↓
Architecture
↓
Key features
↓
Technology stack
↓
Screenshots / gallery
↓
Challenges
↓
What I learned
↓
Results / impact
↓
GitHub / Demo
↓
Next Project
```

Not every project needs every section if information is unavailable.

Do not invent results.

---

# 16. Dropify Case Study

Dropify should receive the strongest project presentation.

Use the existing project information as the factual basis.

Current description:

> Smart last-mile delivery platform using graph-based routing and OSM data, with map visualization, parking-position interpolation, FastAPI backend, and Android application.

Relevant technology/content from the existing portfolio:

- Python
- NetworkX
- Folium
- FastAPI
- Android
- Shapely

The broader project implementation should reflect the actual current stack where applicable:

- React hub manager dashboard
- FastAPI backend
- Java Android driver application
- PostgreSQL + PostGIS
- OSRM
- graph-based route optimization

Do not claim functionality that is not actually implemented.

Suggested Dropify sections:

### Problem

Explain the last-mile delivery problem:
- too many individual stops
- inefficient vehicle stopping
- walking from parking positions
- route complexity

### Solution

Explain:
- grouping nearby deliveries
- selecting practical vehicle stopping locations
- planning walking routes
- assigning delivery work to drivers

### System

Show:

```text
Hub Manager Dashboard
        ↓
FastAPI Backend
        ↓
PostgreSQL + PostGIS
        ↓
Routing / Optimization
        ↓
Driver Android App
```

### Visuals

Include:
- map screenshots
- route screenshots
- dashboard screenshots
- mobile app screenshots
- architecture diagrams

Use large images with captions.

---

# 17. CaseLaw RAG Page

Existing portfolio description:

Hybrid BM25 + FAISS retrieval pipeline for U.S. federal case law, using LangGraph + LLaMA 3.3-70B through Groq and a custom judicial-style UI.

Technologies:

- Python
- FAISS
- LangGraph
- Groq
- Gradio
- BM25

Project page should explain:

```text
User Query
   ↓
Query Processing
   ↓
Hybrid Retrieval
   ├── BM25
   └── FAISS
   ↓
Context Selection
   ↓
LLM
   ↓
Answer
```

Do not exaggerate legal accuracy.

Clearly position it as a technical/research project.

---

# 18. Spotify Recommendation System

Existing portfolio direction:

- audio feature analysis
- feature engineering
- similarity scoring
- personalized recommendations
- Spotify API data

Technologies:

- Python
- Scikit-learn
- Spotify API
- Pandas
- Flask

Show:
- dataset / feature explanation
- preprocessing
- similarity logic
- recommendation flow
- UI
- example output

---

# 19. TraceQ

Existing description:

Role-based lost-and-found platform with smart item matching and real-time notifications for campuses and communities.

Technologies:

- React.js
- Node.js
- PostgreSQL
- Firebase

Show:
- user flow
- roles
- item creation
- matching
- notification flow
- architecture
- screenshots

---

# 20. NRF26 Event Platform

Existing portfolio content:

Complete digital infrastructure for EWU National RoboFest 2026 including:
- profile frame generator
- Google Sheets leaderboard
- arcade game / Signal Surge
- registration portal
- ambassador tools

Technologies include:

- HTML5
- Canvas
- Fabric.js
- Google Sheets API
- JavaScript

This page should focus strongly on:
- real-world scale
- event technology
- user volume
- operational challenge
- multiple tools integrated into one ecosystem

---

# 21. IoT Smart Monitoring System

Existing description:

Real-time environmental monitoring using NodeMCU and sensors, sending data to Firebase with threshold-based alerts and an analytics dashboard.

Technologies:

- NodeMCU
- C++
- Firebase
- JavaScript

Show:
- hardware
- data pipeline
- dashboard
- alerts
- architecture

---

# 22. About Page

The About page should be more personal than the home page.

Possible structure:

```text
Who I am
↓
What I care about
↓
How I build
↓
Education
↓
Leadership
↓
Interests
↓
Currently exploring
```

Use a narrative rather than a resume dump.

Existing portfolio wording establishes these themes:

- CSE undergraduate at East West University
- building systems that solve real problems
- frontend engineering + machine learning
- interest in system architecture
- robotics/event leadership

Preserve the authentic voice.

---

# 23. Experience Page

Create a dedicated timeline.

Current source content includes:

### President
EWU Robotics Club

2024 — Present

Leadership, technical vision, club operations, and EWU National RoboFest 2026.

Existing figures:
- 2K+ participants
- 80+ institutions
- 20+ partners
- 7 event segments

### Graphics Designer
Executive Committee — EWU Robotics Club

2023 — 2024

Responsible for visual identity, banners, social media, and event campaign design.

Do not invent companies or employment history.

---

# 24. Competitive Programming

The old site includes Codeforces live data.

Retain this concept, but make it more polished.

Display:

- Rating
- Max Rating
- Rank
- Problems Solved
- Codeforces profile

Existing handle:

```text
Rafi1210
```

Focus areas:

- Dynamic Programming
- Graph Algorithms
- Binary Search
- Greedy
- STL & Data Structures
- Mathematics
- Divide & Conquer
- Number Theory

The original implementation calls the Codeforces API directly from the browser. In the new architecture, use a safer approach if necessary and gracefully handle:
- API failure
- CORS
- loading
- rate limits
- missing data

Never make the entire page dependent on the API.

---

# 25. Skills Page / Section

Use grouped skills.

Current source:

## Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- TailwindCSS
- Figma

## Backend
- FastAPI
- Node.js
- Flask
- PHP
- REST APIs

## AI / ML
- Scikit-learn
- TensorFlow
- PyTorch
- RAG
- LLM
- FAISS
- LangGraph

## Database
- PostgreSQL
- MySQL
- Firebase
- Room DB

## Languages
- Python
- C++
- Java
- SQL
- JavaScript

## Tools
- Git
- Linux
- Android Studio
- Google Colab
- Jupyter

Do not display skills as fake percentage bars.

Prefer:
- tags
- grouped cards
- visual clusters
- subtle icons

---

# 26. Research Section

Current interests:

- AI in Logistics
- RAG Systems
- Recommendation Engines
- Graph Algorithms
- Intelligent Automation

Current ongoing work includes Dropify research and applied data mining topics.

Existing source says publications are in progress.

Do not fabricate publication titles, journals, or papers.

Use wording such as:

> Publications in progress — coming soon.

---

# 27. Achievements

Current source includes:

- Club President
- National RoboFest
- AI/ML Systems
- CTF Challenges
- Android Development
- Data Mining Research

Present these as milestones rather than generic icon cards.

Use a timeline or editorial grid.

---

# 28. Certifications

Current source includes:

- Machine Learning Specialization — Coursera / DeepLearning.AI
- Responsive Web Design — freeCodeCamp
- Python for Data Science — IBM / Coursera
- Cybersecurity Fundamentals — Google / Coursera
- Android Development — Self-taught / Google Codelabs

If certificate URLs are later provided, add verification buttons.

Do not invent certificate IDs.

---

# 29. Contact Page

Make the contact page visually strong.

Headline direction:

```text
Have something worth building?
Let's talk.
```

Provide:

- Email
- GitHub
- LinkedIn
- Codeforces
- Resume

Existing links:

```text
Email:
sadatahmedrafi12@gmail.com

GitHub:
https://github.com/Rafi1210

LinkedIn:
https://linkedin.com/in/sadat-ahmed-rafi

Codeforces:
https://codeforces.com/profile/Rafi1210
```

Resume should be configurable from one central data/config file.

Do not scatter the resume URL across components.

---

# 30. Footer

Minimal footer.

Include:

```text
© 2026 Md. Sadat Ahmed Rafi
Designed & built from scratch
Dhaka, Bangladesh
```

Add social links.

Keep it clean.

---

# 31. Animation System

Use a consistent animation language.

## Page transitions

When navigating between routes:

- fade
- slight vertical movement
- short duration

Avoid slow page transitions.

## Reveal

Sections should reveal on scroll.

Suggested:

```text
opacity: 0 → 1
y: 20px → 0
duration: 0.5–0.8s
```

## Stagger

Cards can appear with:

```text
0ms
80ms
160ms
240ms
```

Do not stagger huge lists excessively.

## Hover

Cards:

- slight translateY
- subtle border change
- image scale 1.02–1.05
- arrow movement

Buttons:

- slight lift
- soft shadow
- icon movement

---

# 32. Reduced Motion

Accessibility is mandatory.

Respect:

```text
prefers-reduced-motion: reduce
```

When enabled:
- remove parallax
- remove cursor trails
- reduce transitions
- disable decorative loops
- keep content fully usable

---

# 33. Responsive Design

Mobile is not an afterthought.

Breakpoints should be designed intentionally.

### Mobile

- one-column layouts
- generous horizontal padding
- readable typography
- touch-friendly buttons
- no hover-dependent information
- no custom cursor
- project images optimized
- navigation becomes mobile menu

### Tablet

- two-column layouts where useful
- preserve visual hierarchy
- no excessive whitespace

### Desktop

- max-width around 1200–1280px
- editorial grid
- asymmetric project sections
- large typography

### Ultra-wide

Do not allow text lines to become excessively long.

---

# 34. Accessibility

Must include:

- semantic HTML
- proper headings
- keyboard navigation
- visible focus states
- alt text
- accessible buttons
- accessible mobile menu
- sufficient color contrast
- reduced motion support
- descriptive link labels

Never rely on color alone.

---

# 35. Performance

Optimize for:

- fast initial load
- lazy-loaded project images
- route-level code splitting where appropriate
- optimized assets
- no unnecessary animation libraries
- minimal DOM complexity
- avoid giant background videos
- avoid huge image payloads

Use `loading="lazy"` where appropriate.

Use modern image formats when available.

---

# 36. SEO

Add:

- title
- description
- Open Graph metadata
- Twitter/X card metadata
- canonical URL
- favicon
- semantic headings

Suggested title:

```text
Md. Sadat Ahmed Rafi — Developer & Builder
```

Description should mention:
- CSE
- software development
- AI/ML
- systems
- portfolio

Add structured metadata only when accurate.

---

# 37. Data Architecture

Create centralized data files.

Example:

```js
export const projects = [
  {
    slug: "dropify",
    title: "Dropify",
    category: "Systems / Logistics",
    description: "...",
    featured: true,
    technologies: [],
    github: "",
    demo: "",
    image: "",
    overview: "",
    problem: "",
    solution: "",
    architecture: [],
    features: [],
    challenges: [],
    results: [],
  }
];
```

This makes future project additions easy.

---

# 38. Project Images

Create a consistent visual treatment.

Each project should support:

- hero image
- gallery
- screenshots
- architecture diagram
- optional video/demo

Use a reusable gallery component.

If images are not yet available:
- create elegant placeholders
- clearly label them internally
- do not fabricate screenshots

---

# 39. Project Page Navigation

At the bottom of every project:

```text
← Previous Project

All Projects

Next Project →
```

Animate transitions subtly.

This creates a portfolio "story".

---

# 40. Interaction Details

Add premium micro-interactions:

### Magnetic buttons
Only on desktop and pointer devices.

### Project card hover
Image subtly zooms.

### Arrow
Moves diagonally.

### Link underline
Animated from left to right.

### Section labels
Can have a tiny animated indicator.

### Scroll progress
Thin top progress bar.

Keep everything subtle.

---

# 41. Background Atmosphere

Instead of the old dark grid and neon orbs, use a light atmospheric background.

Possible:

- very subtle radial gradient
- blurred pastel orb
- fine grain/noise texture
- extremely faint grid in selected sections

Do not make the background compete with content.

---

# 42. Typography

Use one strong display font and one readable body font.

Possible:

- Sora
- Inter
- Geist
- Manrope
- Plus Jakarta Sans

Use a monospace font only for:
- metadata
- technology labels
- project numbers
- small technical details

Do not overuse monospace.

---

# 43. Content Tone

Tone should be:

- confident
- technical
- human
- concise
- intelligent
- not corporate
- not overly self-promotional

Avoid phrases like:

```text
I am a passionate developer who loves coding.
```

Prefer specific statements about what is built and why.

---

# 44. Content Integrity

The original HTML is the source of truth for the current portfolio content.

Do not silently:
- invent jobs
- invent awards
- invent users
- invent metrics
- invent publications
- invent clients
- invent project results
- invent technologies

If information is missing, use a placeholder in the data layer and make it easy for the owner to update.

The source explicitly identifies the person and core profile information in the metadata and hero section. fileciteturn0file0L5-L10

---

# 45. Existing Portfolio Content to Preserve

The existing HTML contains these major sections:

```text
About
Skills
Experience & Leadership
Competitive Programming
Projects
Research & Publications
Achievements
Certifications
Contact
```

It also includes:
- animated typing roles
- Codeforces live data
- responsive mobile navigation
- reveal-on-scroll animation
- smooth scrolling
- GitHub / LinkedIn / Codeforces / Resume links

The new implementation should preserve the useful ideas while rebuilding them in React.

---

# 46. Home Page vs Dedicated Pages

Do not put everything on the homepage.

## Homepage should contain

- Hero
- Featured projects
- short about
- selected experience
- selected skills
- selected achievements
- research teaser
- contact CTA

## Dedicated pages

### Projects
Full project listing.

### Project details
Full case studies.

### About
Personal story, education, interests.

### Experience
Detailed leadership timeline.

### Contact
Dedicated contact experience.

This is a major requirement.

---

# 47. Loading Experience

Create a lightweight initial loading state only if necessary.

Do not use a long fake loading screen.

If using a preloader:

- 300–700ms maximum
- simple typography/logo
- smooth exit
- never block users unnecessarily

---

# 48. Error Handling

For external APIs such as Codeforces:

```text
Loading...
```

then:

```text
Data unavailable
```

rather than breaking the page.

Project links that are not available should be hidden rather than pointing to `#`.

---

# 49. External Link Behavior

External links should:

```html
target="_blank"
rel="noopener noreferrer"
```

where appropriate.

Use clear external-link icons.

---

# 50. Resume

Use one centralized resume configuration.

Example:

```js
export const siteConfig = {
  resumeUrl: "...",
};
```

The navbar, hero, contact page, and footer should reference the same value.

---

# 51. Mobile UX Rules

On mobile:

- no custom cursor
- no horizontal overflow
- no tiny text
- no hover-only interactions
- buttons at least approximately 44px tall
- project cards remain easy to tap
- images remain visually dominant
- navbar menu is keyboard accessible
- animations are reduced

Test manually at:

```text
320px
360px
375px
390px
414px
768px
1024px
1280px
1440px
```

---

# 52. Browser Compatibility

Target modern:

- Chrome
- Edge
- Firefox
- Safari

Avoid experimental CSS features unless there is a safe fallback.

---

# 53. Development Workflow

Build in this order:

## Phase 1 — Setup

- create Vite app
- install Tailwind
- install React Router
- install Framer Motion
- install icons
- configure fonts
- configure global styles

## Phase 2 — Design system

Create:

- colors
- typography
- spacing
- buttons
- cards
- badges
- container
- section heading
- animation presets

## Phase 3 — Layout

Build:

- Navbar
- Footer
- Mobile navigation
- Page transition

## Phase 4 — Homepage

Build:

- Hero
- Featured Projects
- About preview
- Experience preview
- Skills
- Achievements
- Research
- CTA

## Phase 5 — Project system

Build:
- projects data
- ProjectCard
- Projects page
- ProjectDetails page
- gallery
- architecture
- project navigation

## Phase 6 — About/Experience/Contact

Build dedicated pages.

## Phase 7 — API

Add Codeforces integration.

## Phase 8 — Motion polish

Add:
- reveal
- stagger
- hover
- route transition
- scroll progress
- subtle parallax

## Phase 9 — Responsive testing

Test all breakpoints.

## Phase 10 — Performance/SEO

Optimize:
- assets
- images
- metadata
- code splitting
- accessibility

---

# 54. Suggested Animation Variants

Create reusable Framer Motion variants.

Example conceptual variants:

```js
fadeUp
fadeIn
scaleIn
slideLeft
slideRight
staggerContainer
```

Do not duplicate animation definitions throughout components.

---

# 55. Component Reusability

Create reusable components for:

```text
Button
MagneticButton
Badge
SectionHeading
ProjectCard
TechStack
SocialLink
Reveal
AnimatedText
ImageReveal
PageTransition
```

Do not create dozens of tiny components with no value.

---

# 56. Visual Quality Checklist

Before declaring the website complete, verify:

- [ ] Hero looks impressive immediately
- [ ] Typography hierarchy is strong
- [ ] Colors are light and soft
- [ ] No excessive visual noise
- [ ] Projects feel premium
- [ ] Project pages feel like case studies
- [ ] Animations feel smooth
- [ ] Mobile experience is excellent
- [ ] Desktop experience is excellent
- [ ] No horizontal overflow
- [ ] No broken images
- [ ] No console errors
- [ ] No broken routes
- [ ] External links work
- [ ] Resume works
- [ ] Codeforces failure does not break UI
- [ ] Keyboard navigation works
- [ ] Reduced motion works
- [ ] SEO metadata exists
- [ ] Lighthouse performance is reasonable

---

# 57. Important Agent Instructions

When implementing:

1. **Do not blindly reproduce the original HTML.**
2. Treat the original HTML as the factual content source and inspiration.
3. Rebuild the visual system from scratch using React/Tailwind.
4. Make the landing page significantly more modern.
5. Make the color palette light, soft, and premium.
6. Use animation, but prioritize usability.
7. Create real multi-page navigation.
8. Give every important project a dedicated case-study page.
9. Keep project content data-driven.
10. Make every page responsive.
11. Do not invent information.
12. Do not use placeholder links such as `#` in the finished site.
13. Do not create fake metrics.
14. Do not add unnecessary dependencies.
15. Keep components maintainable.
16. Test mobile behavior carefully.
17. Keep animations accessible.
18. Make the portfolio feel like a real product, not a template.

---

# 58. Final Desired Experience

The visitor should feel:

> "This person builds serious things, understands systems, cares about design, and has actually worked on real projects."

The portfolio should communicate both sides:

```text
Engineering depth
        +
Visual/product sense
        +
Leadership
        +
Problem solving
```

The final result should be **clean, light, modern, animated, responsive, technically credible, and memorable**.

Most importantly:

> **Do not make it look like an AI-generated portfolio template.**
> Give it a distinctive visual identity, strong spacing, editorial composition, intentional motion, and authentic project storytelling.
