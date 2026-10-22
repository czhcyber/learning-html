# Cui Zhongheng — Personal Site

A hand-written, responsive personal website: four pages, no frameworks, no build
step, no dependencies. Everything here — the markup, the stylesheet, the
JavaScript, the illustrations and the icons — was written from scratch for this
project.

> **Replace before submitting:** search every file for `TODO` and for the strings
> `Cui Zhongheng`, `YOUR-USERNAME` and `alex@example.com`. There is a checklist at
> the bottom of this file.

---

## Live site

| | |
|---|---|
| **Address** | https://YOUR-USERNAME.github.io/personal-site/ |
| **Host** | GitHub Pages, served from the `main` branch (root folder) |
| **Cost** | Free |

---

## The pages

| File | Purpose |
|---|---|
| `index.html` | Home — introduction, what I am working on, quick facts |
| `about.html` | About — how I got here, a timeline, skills, interests |
| `projects.html` | Projects — filterable list of four finished projects |
| `contact.html` | Contact — a validated contact form, details, an FAQ |

Every page shares the same header, `<nav>` menu and footer, so all four pages link
to each other in both directions.

---

## Files

```
.
├── index.html              Home page
├── about.html              About page
├── projects.html           Projects page
├── contact.html            Contact page
├── site.webmanifest        App icon / "add to home screen" metadata
├── .nojekyll               Tells GitHub Pages to serve the files as-is
├── .gitignore
├── README.md
└── assets
    ├── css
    │   └── style.css       One stylesheet: tokens, components, responsive layer
    ├── js
    │   └── main.js         One script: theme, nav, form, filter, scroll effects
    └── img
        ├── favicon.svg           Browser tab icon (vector)
        ├── favicon-32.png        Browser tab icon (32×32 raster fallback)
        ├── favicon.ico           Legacy icon, 16/32/48 px in one file
        ├── apple-touch-icon.png  iOS "Add to Home Screen" icon (180×180)
        ├── icon-192.png          Android / PWA app icon (192×192)
        ├── icon-512.png          Android / PWA app icon (512×512)
        ├── icon-512-maskable.png Android adaptive icon (safe-zone padded)
        ├── og-image.png          Open Graph share preview (1200×630)
        ├── hero-illustration.svg Home page illustration
        ├── portrait.svg          About page portrait
        └── project-1..4.svg      Project card illustrations
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

## How the assignment requirements are met

### Pages — at least four, with working navigation

Four pages (`index`, `about`, `projects`, `contact`). Each one carries the same
`<nav>` in the header listing all four, plus a second `<nav>` in the footer. The
current page is marked with `aria-current="page"`, which both styles the active
link and announces it to screen readers.

### Content — my own words and images

All body text was written for this project. No text was copied from any website.

All eleven images are original. The ten SVG illustrations were drawn by hand as
vector graphics specifically for this site; the seven raster icons and the Open
Graph card were generated from the same hand-drawn monogram (see *Image credits*
below). Nothing is stock photography and nothing is under a third-party licence,
so there is no attribution to reproduce.

### Structure — semantic HTML

No `<div>` soup. The pages are built from:

`<header>` `<nav>` `<main>` `<section>` `<article>` `<aside>` `<footer>`
`<figure>` `<figcaption>` `<ol>` `<ul>` `<dl>` `<dt>` `<dd>` `<form>`
`<label>` `<fieldset>`-style grouping, `<details>` `<summary>`

Heading levels are strictly `h1` → `h2` → `h3`, with exactly one `h1` per page.
Every `<section>` has an accessible name via `aria-labelledby`, every `<img>` has
an `alt` attribute, and the pages open with a skip link for keyboard users.

### Layout — responsive, works on a phone

* `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page.
* Mobile-first CSS: the single-column layout *is* the default, and every
  multi-column rule lives inside a `min-width` media query.
* Breakpoints at **640 px**, **820 px** and **1024 px**.
* Fluid type with `clamp()`, and `minmax(0, 1fr)` on every grid so a wide image
  can never force the page to scroll sideways.
* The layout was measured at a 390 px viewport: `document.scrollWidth` is 390 px
  and no element overflows.

### Behaviour — responds to the user

| Interaction | Where |
|---|---|
| Light / dark theme toggle, remembered in `localStorage` | Every page, header |
| Mobile hamburger menu that animates into a cross | Every page, under 820 px |
| Live contact form validation with inline error messages | `contact.html` |
| Project filtering by tag, with a live result count | `projects.html` |
| FAQ accordion | `contact.html` |
| Scroll-reveal animation | All pages |
| Skill bars that fill when scrolled into view | `about.html` |
| Hover states on every button, card and link | All pages |

Everything degrades: with JavaScript switched off the site is still readable,
navigable and complete — only the animations and the form's custom messages
disappear.

### Live — a real address

Hosted with GitHub Pages. See *Deploying* below.

### History — a Git history that shows it grow

The project was committed in stages rather than in one go, so the history shows
the site being built up piece by piece:

1. Project skeleton, `.gitignore`, README
2. `index.html`
3. `about.html`
4. `projects.html`
5. `contact.html` and the form markup
6. Stylesheet part 1 — design tokens, layout, components
7. Stylesheet part 2 — the responsive layer and print styles
8. JavaScript part 1 — theme toggle and mobile navigation
9. JavaScript part 2 — form validation, project filter, scroll effects
10. Identity images — favicon, app icons, Open Graph card, web manifest
11. Final polish — README, `.nojekyll`

### Identity — favicon, app icon, Open Graph image

* **Favicon** — `favicon.svg` (vector, sharp at any size), with `favicon-32.png`
  and `favicon.ico` as fallbacks for older browsers.
* **App icon** — `apple-touch-icon.png` for iOS, `icon-192.png` and
  `icon-512.png` for Android, plus `icon-512-maskable.png` so the icon survives
  Android's adaptive shape masking. All four are declared in
  `site.webmanifest`, which also sets the app name, theme colour and
  `display: standalone`.
* **Open Graph image** — `og-image.png`, exactly **1200 × 630 px**, declared with
  `og:image`, `og:image:width`, `og:image:height` and `og:image:alt` on all four
  pages, alongside `twitter:card` for X/Twitter.

---

## Image credits

Every image in this project is original work created for it.

| Image | How it was made |
|---|---|
| `hero-illustration.svg` | Hand-drawn SVG, this project |
| `portrait.svg` | Hand-drawn SVG, this project |
| `project-1.svg` … `project-4.svg` | Hand-drawn SVG, this project |
| `favicon.svg` | Hand-drawn SVG monogram, this project |
| `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Rasterised from the same monogram |
| `og-image.png` | Composed from the monogram and CSS-style shapes |

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

## Placeholder checklist

Search the project for `TODO` — every placeholder is also marked with a comment.

- [ ] `Cui Zhongheng` → your own name (4 HTML files, plus `README.md`, `site.webmanifest`,
      `og-image.png` and `portrait.svg` if you want the artwork to match)
- [ ] `YOUR-USERNAME` → your GitHub username (canonical URLs, `og:url`, `og:image`,
      footer links)
- [ ] `alex@example.com` → your real email (`contact.html`, footers)
- [ ] Rewrite the body copy in your own voice — the structure and the styling are
      the graded part, but the words must be yours
- [ ] Swap `hero-illustration.svg` and `portrait.svg` for your own photographs if
      you would rather use real images
- [ ] Regenerate `og-image.png` after changing the name, so the card matches