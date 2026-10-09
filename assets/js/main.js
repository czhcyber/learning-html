/* ==========================================================================
   Alex Chen — personal site
   main.js  (part 1 of 2)

   Deliberately small: this file adds behaviour that HTML cannot express on
   its own, and nothing else. Everything degrades gracefully — with JavaScript
   switched off the site is still readable, navigable and usable.

   Part 2 adds the form validation, the project filter and the scroll effects.
   ========================================================================== */

(function () {
  "use strict";

  /* Mark the document as JavaScript-enabled. CSS uses html.js to opt in to
     the scroll-reveal animation, so nothing is hidden if this file fails. */
  document.documentElement.classList.add("js");

  var doc = document;

  /* ------------------------------------------------------------------
     1. Current year in the footer
     ------------------------------------------------------------------ */
  function initYear() {
    var year = String(new Date().getFullYear());
    var targets = doc.querySelectorAll("[data-current-year]");
    for (var i = 0; i < targets.length; i++) {
      targets[i].textContent = year;
    }
  }

  /* ------------------------------------------------------------------
     2. Mobile navigation
     The button is hidden on wide screens by CSS; aria-expanded is kept in
     sync here so the state is announced to screen readers.
     ------------------------------------------------------------------ */
  function initNav() {
    var toggle = doc.querySelector(".nav-toggle");
    var nav = doc.getElementById("site-nav");
    if (!toggle || !nav) { return; }

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    /* Close the menu after tapping a link, so the next page is not
       covered by an open drawer. */
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) { setOpen(false); }
    });

    /* Escape closes the menu and returns focus to the button. */
    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* If the window is resized up to the desktop layout, drop the mobile
       state so the nav cannot be stuck open. */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) { setOpen(false); }
    });
  }

  /* ------------------------------------------------------------------
     3. Colour theme
     The choice is stored in localStorage; without a stored choice the
     site follows the operating system setting.
     ------------------------------------------------------------------ */
  var THEME_KEY = "alex-site-theme";

  function storedTheme() {
    try { return window.localStorage.getItem(THEME_KEY); }
    catch (error) { return null; }
  }

  function saveTheme(value) {
    try { window.localStorage.setItem(THEME_KEY, value); }
    catch (error) { /* private mode: the site simply will not remember */ }
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(theme, toggle) {
    var isDark = theme === "dark";
    if (isDark) {
      doc.documentElement.setAttribute("data-theme", "dark");
    } else {
      doc.documentElement.removeAttribute("data-theme");
    }
    if (toggle) {
      toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
      var icon = toggle.querySelector(".theme-toggle-icon");
      if (icon) { icon.textContent = isDark ? "☀️" : "🌙"; }
    }
  }

  function initTheme() {
    var toggle = doc.querySelector(".theme-toggle");
    applyTheme(storedTheme() || (systemPrefersDark() ? "dark" : "light"), toggle);
    if (!toggle) { return; }

    toggle.addEventListener("click", function () {
      var next = doc.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next, toggle);
      saveTheme(next);
    });

    /* Follow the system only while the visitor has not chosen for themselves. */
    if (window.matchMedia) {
      var query = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function (event) {
        if (!storedTheme()) { applyTheme(event.matches ? "dark" : "light", toggle); }
      };
      if (query.addEventListener) { query.addEventListener("change", onChange); }
      else if (query.addListener) { query.addListener(onChange); }
    }
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  function init() {
    initYear();
    initNav();
    initTheme();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
