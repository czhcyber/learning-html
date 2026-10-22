# Personal Portfolio Website

A hand-written, responsive personal website with interactive projects: multiple pages,
no frameworks, no build step, no dependencies. Everything here — the markup,
the stylesheet, the JavaScript, the illustrations and the icons — was written from
scratch for this project.

**Features:**
- 🎨 Modern dark theme with glassmorphism design
- 📱 Fully responsive layout (mobile-first approach)
- 🌓 Light/dark theme toggle with localStorage persistence
- 🚀 4 fully functional interactive projects
- 📍 Now Page concept (inspired by Derek Sivers)
- ♿ Accessible with semantic HTML and ARIA labels
- ⚡ Smooth animations and micro-interactions

---

## Live site

| | |
|---|---|
| **Address** | https://YOUR-USERNAME.github.io/personal-site/ |
| **Host** | GitHub Pages, served from the `main` branch (root folder) |
| **Cost** | Free |

---

## The main pages

| File | Purpose |
|---|---|
| `index.html` | Home — introduction, quick facts, featured projects |
| `about.html` | About — quotes, personal story, skills, interests |
| `projects.html` | Projects — showcase of all interactive projects |
| `contact.html` | Now Page — current focus, goals, tools, fun facts |

Every main page shares the same header, `<nav>` menu and footer, so all four pages link
to each other in both directions.

---

## Interactive Projects

Each project has its own dedicated sub-page with full functionality:

| Project | File | Description |
|---------|------|-------------|
| 🍅 **Study Timer** | `study timer.html` | Pomodoro-based study tool with multiple modes, task tracking, statistics, and notifications |
| 🃏 **Card Game** | `card-game.html` | Browser-based card game with complete game logic, turn-based gameplay, and clean UI |
| 🔐 **Password Generator** | `password-generator.html` | Secure password generator with customizable options, real-time strength meter, and one-click copy |
| 🤖 **Useless Machine** | `useless-machine.html` | Fun interactive animation where a finger pushes a toggle switch back |

All projects feature:
- Dark theme consistent with the main site
- Glassmorphism design (backdrop-filter blur)
- Smooth CSS animations and transitions
- Fully responsive design
- No external dependencies

---

## Files

```
.
├── Main Pages
│   ├── index.html              Home page
│   ├── about.html              About page
│   ├── projects.html           Projects showcase page
│   └── contact.html            Now Page (current status & goals)
│
├── Interactive Projects
│   ├── study timer.html        Pomodoro study timer
│   ├── card-game.html          Browser card game
│   ├── password-generator.html Secure password generator
│   └── useless-machine.html    Interactive animation project
│
├── Configuration
│   ├── site.webmanifest        App icon / "add to home screen" metadata
│   ├── .nojekyll               Tells GitHub Pages to serve files as-is
│   ├── .gitignore
│   └── README.md               This file
│
└── assets
    ├── css
    │   └── style.css           Main stylesheet: tokens, components, responsive layer
    ├── js
    │   └── main.js             Main script: theme, nav, scroll effects
    └── img
        ├── favicon.svg                    Browser tab icon (vector)
        ├── favicon-32.png                 Browser tab icon (32×32 raster fallback)
        ├── favicon.ico                    Legacy icon, 16/32/48 px
        ├── apple-touch-icon.png           iOS "Add to Home Screen" icon (180×180)
        ├── icon-192.png                   Android / PWA app icon (192×192)
        ├── icon-512.png                   Android / PWA app icon (512×512)
        ├── icon-512-maskable.png          Android adaptive icon
        ├── og-image.png                   Open Graph share preview (1200×630)
        ├── hero-illustration.svg          Home page illustration
        ├── portrait.svg                   About page portrait
        ├── study-timer-preview.svg        Study Timer card preview
        ├── password-generator-preview.svg Password Generator card preview
        └── project-1..4.svg               Original project card illustrations
```

---

## Running it locally

There is nothing to install and nothing to compile. Because the pages use no
absolute paths, you can simply open `index.html` in a browser.

To serve it over HTTP instead (closer to how it behaves when deployed):

```bash
python -m http.server 8899
```

Then open <http://127.0.0.1:8899/>.

---

## How the project requirements are met

### Pages — main site + interactive projects

**Main pages (4):**
- `index.html` — Home: introduction, quick facts, featured projects
- `about.html` — About: quotes, personal story, skills, interests
- `projects.html` — Projects: showcase of all interactive projects
- `contact.html` — Now Page: current focus, goals, tools, fun facts (inspired by Derek Sivers)

**Interactive project sub-pages (4):**
- `study timer.html` — Full-featured Pomodoro timer with multiple modes
- `card-game.html` — Browser-based card game with game logic
- `password-generator.html` — Secure password generator with strength meter
- `useless-machine.html` — Fun animation project with finger interaction

Each main page carries the same `<nav>` in the header listing all four, plus a second
`<nav>` in the footer. The current page is marked with `aria-current="page"`.
Interactive projects link back to the main Projects page.

### Content — original words and images

All body text was written for this project. No text was copied from any website.

All images are original:
- Hand-drawn SVG illustrations for the main site
- Generated SVG previews for each interactive project
- Raster icons generated from hand-drawn monogram
- No stock photography or third-party licenses

### Structure — semantic HTML

No `<div>` soup. The pages are built from:

`<header>` `<nav>` `<main>` `<section>` `<article>` `<aside>` `<footer>`
`<figure>` `<figcaption>` `<ol>` `<ul>` `<dl>` `<dt>` `<dd>` `<form>`
`<label>` `<fieldset>`-style grouping, `<details>` `<summary>`

Heading levels are strictly `h1` → `h2` → `h3`, with exactly one `h1` per page.
Every `<section>` has an accessible name via `aria-labelledby`, every `<img>` has
an `alt` attribute, and the pages open with a skip link for keyboard users.

### Layout — responsive, works on mobile

* `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page.
* Mobile-first CSS: the single-column layout *is* the default, and every
  multi-column rule lives inside a `min-width` media query.
* Breakpoints at **640 px**, **820 px** and **1024 px**.
* Fluid type with `clamp()`, and `minmax(0, 1fr)` on every grid so a wide image
  can never force the page to scroll sideways.
* Interactive projects use full-screen dark theme layouts optimized for engagement.

### Behaviour — rich interactivity

**Main site interactions:**

| Interaction | Where |
|---|---|
| Light / dark theme toggle, remembered in `localStorage` | Every page, header |
| Mobile hamburger menu that animates into a cross | Every page, under 820 px |
| Scroll-reveal animation | All main pages |
| Hover states on every button, card and link | All pages |

**Interactive project features:**

| Feature | Project |
|---------|---------|
| Timer countdown with circular progress bar | Study Timer |
| Mode switching (Focus/Short Break/Long Break) | Study Timer |
| Task list with localStorage persistence | Study Timer |
| Statistics tracking (completed pomodoros, total time) | Study Timer |
| Browser notifications | Study Timer |
| Card dealing and gameplay logic | Card Game |
| Turn-based interaction | Card Game |
| Password generation with customizable options | Password Generator |
| Real-time password strength indicator | Password Generator |
| One-click copy to clipboard | Password Generator |
| Toggle switch animation | Useless Machine |
| Finger push-back animation | Useless Machine |
| Push counter | Useless Machine |

Everything degrades gracefully: with JavaScript switched off the site is still readable,
navigable and complete — only the animations and interactive features are disabled.

### Live — deployed online

Hosted with GitHub Pages. See *Deploying* below.

### History — Git history showing growth

The project was committed in stages, showing iterative development:

1. Initial setup: project skeleton, `.gitignore`, README
2. Main pages: `index.html`, `about.html`, `projects.html`
3. Now Page transformation: `contact.html` reimagined
4. Interactive projects added:
   - Card Game (`card-game.html`)
   - Study Timer (`study timer.html`)
   - Password Generator (`password-generator.html`)
   - Useless Machine (`useless-machine.html`)
5. Visual assets: project preview images, updated icons
6. Styling refinements: unified dark theme across all pages
7. Documentation updates: comprehensive README
8. Final polish: cross-page navigation, responsive testing

### Identity — favicon, app icon, Open Graph image

* **Favicon** — `favicon.svg` (vector, sharp at any size), with `favicon-32.png`
  and `favicon.ico` as fallbacks for older browsers.
* **App icon** — `apple-touch-icon.png` for iOS, `icon-192.png` and
  `icon-512.png` for Android, plus `icon-512-maskable.png` for adaptive icons.
  All declared in `site.webmanifest`.
* **Open Graph image** — `og-image.png`, exactly **1200 × 630 px**, declared on
  all main pages alongside `twitter:card`.

---

## Image credits

Every image in this project is original work created for it.

### Main site images

| Image | How it was made |
|---|---|
| `hero-illustration.svg` | Hand-drawn SVG, this project |
| `portrait.svg` | Hand-drawn SVG, this project |
| `project-1.svg` … `project-4.svg` | Hand-drawn SVG, this project |
| `favicon.svg` | Hand-drawn SVG monogram, this project |
| `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Rasterised from the same monogram |
| `og-image.png` | Composed from the monogram and CSS-style shapes |

### Interactive project previews

| Image | How it was made |
|---|---|
| `study-timer-preview.svg` | Generated SVG showing timer interface |
| `password-generator-preview.svg` | Generated SVG showing password generator interface |

No third-party images, icons or fonts are used. Typefaces are the operating
system's own (Segoe UI / Arial / Consolas), so no web fonts are downloaded
either.

---

## Deploying to GitHub Pages

1. Create a new **public** repository named `personal-site` on GitHub. Do not add
   a README, `.gitignore` or licence — the repository must start empty.
2. In this folder, point the local repository at it (replace `YOUR-USERNAME`):

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/personal-site.git
   git branch -M main
   git push -u origin main
   ```

3. On GitHub, open the repository → **Settings** → **Pages**.
4. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick
   the **main** branch and the **/ (root)** folder, then **Save**.
5. Wait one to two minutes. The site appears at:

   ```
   https://YOUR-USERNAME.github.io/personal-site/
   ```

6. Replace every `YOUR-USERNAME` in the four HTML files with your real username,
   then commit and push again so the Open Graph image and canonical URLs point at
   the live address.

To check that the Open Graph card is correct, paste the live URL into any Open
Graph preview tool — it should show the 1200 × 630 card with your name on it.

---

## Project checklist

Search the project for `TODO` — every placeholder is also marked with a comment.

### Before deploying:

- [ ] Replace `YOUR-USERNAME` with your real GitHub username in:
  - All 4 main HTML files (canonical URLs, Open Graph data)
  - Footer links
  - This README file
- [ ] Update personal information:
  - Name in `index.html`, `about.html`, `site.webmanifest`
  - Email address (if displayed)
  - Personal details in Now Page (`contact.html`)
- [ ] Customize content:
  - Rewrite body copy in your own voice
  - Update project descriptions to reflect your actual work
  - Modify Now Page goals and fun facts to match your situation
  - Adjust skill levels and interests in About page
- [ ] Visual assets (optional):
  - Replace `hero-illustration.svg` and `portrait.svg` with your own images
  - Regenerate `og-image.png` after changing name
  - Create custom favicon/monogram if desired

### Quality checks:

- [ ] Test all pages in browser (both desktop and mobile)
- [ ] Verify all navigation links work correctly
- [ ] Test all interactive projects function as expected
- [ ] Check theme toggle works and persists
- [ ] Validate HTML (no errors in console)
- [ ] Test responsive design at different viewport sizes
- [ ] Verify accessibility (keyboard navigation, screen reader)
- [ ] Check all images load correctly

### Deployment:

- [ ] Create GitHub repository (see *Deploying* section below)
- [ ] Push all files to repository
- [ ] Configure GitHub Pages settings
- [ ] Verify live site loads correctly
- [ ] Test all interactive features on live site
- [ ] Share Open Graph preview to verify social media cards

---

## Tech stack & design decisions

### Technologies used

**No frameworks, no build tools, no dependencies — pure HTML, CSS, and JavaScript:**

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic markup, accessibility (ARIA), forms |
| **CSS3** | Custom properties, Grid, Flexbox, animations, backdrop-filter |
| **JavaScript (ES6+)** | DOM manipulation, localStorage, async/await, event handling |
| **SVG** | Vector illustrations, icons, project previews |
| **localStorage** | Data persistence for Study Timer and Password Generator preferences |

### Design system

**Color palette (dark theme):**
- Background: `#1a1a2e` → `#16213e` (deep blue gradient)
- Primary accent: `#ff6b6b` → `#ee5a24` (warm red-orange)
- Secondary: `#4ecdc4` (teal for status/links)
- Text: `rgba(255, 255, 255, 0.88)` (high contrast)
- Cards: `rgba(255, 255, 255, 0.05)` with `backdrop-filter: blur(10px)`

**Typography:**
- System font stack (Segoe UI, Arial, sans-serif)
- Fluid sizing with `clamp()` for responsive text
- Clear hierarchy: h1 (52px) → h2 (25px) → body (16px)

**Components:**
- Glassmorphism cards with subtle borders
- Smooth transitions (0.3s ease)
- Hover effects with transform and shadow
- Consistent border-radius (20-24px for cards)

### Performance

- No external dependencies = zero network requests for libraries
- Minimal JavaScript (only what's needed for interactivity)
- SVG graphics (scalable, small file size)
- Optimized images with appropriate formats
- CSS-only animations where possible (GPU-accelerated)

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Skip links for screen readers
- Sufficient color contrast ratios
- Focus indicators on interactive elements
- Responsive text sizing (no text below 14px)

---

## Project highlights

### 🎯 Now Page concept
Replaced traditional "Contact" page with a **Now Page** — a living document
showing current focus, short-term goals, daily tools, and personal fun facts.
Inspired by [Derek Sivers' nownownow.com](https://nownownow.com/about).

### 🚀 Four interactive projects
Each project is a fully functional, self-contained application:

1. **Study Timer** — Complete Pomodoro technique implementation with:
   - Three timer modes (Focus/Break/Long Break)
   - Circular SVG progress animation
   - Task management with localStorage
   - Statistics dashboard
   - Browser notifications

2. **Card Game** — Turn-based card game featuring:
   - Full game logic and state management
   - Card dealing animations
   - Interactive gameplay
   - Clean, intuitive UI

3. **Password Generator** — Security tool with:
   - Customizable character options
   - Real-time strength meter
   - One-click clipboard copy
   - Password length slider (6-64 chars)

4. **Useless Machine** — Fun animation project:
   - Toggle switch interaction
   - Finger push-back animation
   - Push counter
   - Entertaining micro-interactions

### 🎨 Unified design language
All pages share:
- Consistent dark theme with warm accent colors
- Glassmorphism UI components
- Smooth animations and transitions
- Mobile-first responsive layout
- Cohesive visual identity

---

## Future improvements

Potential enhancements for future iterations:

- [ ] Add more interactive projects (weather app, quote generator, etc.)
- [ ] Implement backend functionality (Node.js/Express)
- [ ] Add database integration for user data persistence
- [ ] Create blog section for documenting learning journey
- [ ] Add PWA features (offline support, install prompt)
- [ ] Implement internationalization (i18n) for multiple languages
- [ ] Add unit tests for JavaScript functionality
- [ ] Optimize performance further (lazy loading, code splitting)
- [ ] Enhance accessibility (WCAG 2.1 AA compliance)
- [ ] Add analytics to track user engagement

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**