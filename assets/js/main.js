/* ==========================================================================
   Cui Zhongheng — personal site
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

/* ==========================================================================
   Cui Zhongheng — personal site
   main.js  (part 2 of 2)

   The interactive pieces:
     4. Contact form validation (with live error messages)
     5. Project filtering on the projects page
     6. Scroll reveal and the skill-bar animation

   Like part 1, every one of these checks that its markup exists before doing
   anything, so the same file can be loaded by all four pages.
   ========================================================================== */

(function () {
  "use strict";

  var doc = document;

  /* ==================================================================
     4. Contact form

     The form has novalidate set in the HTML, which switches off the
     browser's own bubbles so we can show our errors in the page instead,
     in the same place for every visitor.
     ================================================================== */

  var FORM_MESSAGES = {
    name: {
      valueMissing: "Please tell me your name.",
      tooShort: "A name needs at least two characters."
    },
    email: {
      valueMissing: "Please add an email address so I can reply.",
      typeMismatch: "That does not look like an email address — check for a typo."
    },
    subject: {
      valueMissing: "Please choose a subject."
    },
    message: {
      valueMissing: "Please write a message.",
      tooShort: "Please write at least 20 characters so I have something to read."
    },
    consent: {
      valueMissing: "Please tick the box so I know you understood."
    }
  };

  function fieldOf(control) {
    return control.closest(".field");
  }

  function errorBoxOf(form, control) {
    return form.querySelector('[data-error-for="' + control.name + '"]');
  }

  function messageFor(control) {
    var rules = FORM_MESSAGES[control.name] || {};
    var state = control.validity;
    if (state.valueMissing) { return rules.valueMissing || "This field is required."; }
    if (state.typeMismatch) { return rules.typeMismatch || "Please check the format of this field."; }
    if (state.tooShort) { return rules.tooShort || "This is a little too short."; }
    return control.validationMessage || "Please check this field.";
  }

  function markInvalid(form, control, message) {
    var wrapper = fieldOf(control);
    var box = errorBoxOf(form, control);
    if (wrapper) { wrapper.classList.add("has-error"); }
    control.setAttribute("aria-invalid", "true");
    if (box) {
      box.textContent = message;
      box.hidden = false;
    }
  }

  function markValid(form, control) {
    var wrapper = fieldOf(control);
    var box = errorBoxOf(form, control);
    if (wrapper) { wrapper.classList.remove("has-error"); }
    control.removeAttribute("aria-invalid");
    if (box) {
      box.textContent = "";
      box.hidden = true;
    }
  }

  function initContactForm() {
    var form = doc.querySelector("[data-contact-form]");
    if (!form) { return; }

    var controls = form.querySelectorAll("input, select, textarea");
    var success = form.querySelector("[data-form-success]");
    var counter = form.querySelector("[data-char-count]");
    var messageField = form.querySelector("#message");

    function validate(control) {
      if (control.checkValidity()) {
        markValid(form, control);
        return true;
      }
      markInvalid(form, control, messageFor(control));
      return false;
    }

    function clearAll() {
      Array.prototype.forEach.call(controls, function (control) {
        markValid(form, control);
      });
    }

    Array.prototype.forEach.call(controls, function (control) {
      var isChoice = control.tagName === "SELECT" || control.type === "checkbox";

      /* Validate when the visitor leaves the field... */
      control.addEventListener("blur", function () {
        if (control.value !== "" || control.type === "checkbox") { validate(control); }
      });

      /* ...and clear the error the moment they fix it, rather than
         nagging them while they are still typing the first time. */
      control.addEventListener(isChoice ? "change" : "input", function () {
        var wrapper = fieldOf(control);
        if (wrapper && wrapper.classList.contains("has-error")) { validate(control); }
      });
    });

    if (messageField && counter) {
      var updateCount = function () {
        counter.textContent = String(messageField.value.length);
      };
      messageField.addEventListener("input", updateCount);
      updateCount();
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var firstInvalid = null;
      Array.prototype.forEach.call(controls, function (control) {
        if (!validate(control) && !firstInvalid) { firstInvalid = control; }
      });

      if (firstInvalid) {
        if (success) { success.hidden = true; }
        firstInvalid.focus();
        return;
      }

      /* reset() fires the reset handler below, so the confirmation is shown
         afterwards — otherwise it would be hidden again immediately. */
      form.reset();
      clearAll();
      if (counter) { counter.textContent = "0"; }
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });

    form.addEventListener("reset", function () {
      clearAll();
      if (success) { success.hidden = true; }
      if (counter) { counter.textContent = "0"; }
    });
  }

  /* ==================================================================
     5. Project filter
     ================================================================== */
  function initProjectFilter() {
    var grid = doc.querySelector("[data-project-grid]");
    if (!grid) { return; }

    var buttons = doc.querySelectorAll(".filter-button");
    var items = grid.querySelectorAll(".project");
    var status = doc.querySelector("[data-filter-status]");
    var empty = doc.querySelector("[data-empty-state]");

    function applyFilter(filter) {
      var shown = 0;

      Array.prototype.forEach.call(items, function (item) {
        var tags = (item.getAttribute("data-tags") || "").split(/\s+/);
        var matches = filter === "all" || tags.indexOf(filter) !== -1;
        item.classList.toggle("is-hidden", !matches);
        if (matches) { shown += 1; }
      });

      if (status) {
        status.textContent = filter === "all"
          ? "Showing all " + shown + " projects."
          : "Showing " + shown + " project" + (shown === 1 ? "" : "s") +
            " tagged \u201C" + filter + "\u201D.";
      }

      if (empty) { empty.hidden = shown !== 0; }
    }

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        Array.prototype.forEach.call(buttons, function (other) {
          var active = other === button;
          other.classList.toggle("is-active", active);
          other.setAttribute("aria-pressed", active ? "true" : "false");
        });
        applyFilter(button.getAttribute("data-filter"));
      });
    });

    /* Fade the cards in on first paint so the page does not simply appear. */
    applyFilter("all");
  }

  /* ==================================================================
     6a. Scroll reveal
     Elements fade up as they enter the viewport. The .reveal class is
     added here rather than in the HTML, so if this file never loads the
     content is visible instead of stuck at opacity 0.
     ================================================================== */
  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) { return; }

    var nodes = doc.querySelectorAll(
      ".card, .timeline-item, .project, .facts, .skills, .split-figure, .cta-inner"
    );
    if (!nodes.length) { return; }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    Array.prototype.forEach.call(nodes, function (node, index) {
      node.classList.add("reveal");
      /* A small stagger, capped at three steps, so a grid does not pulse. */
      node.style.transitionDelay = (Math.min(index, 6) % 4) * 70 + "ms";
      observer.observe(node);
    });
  }

  /* ==================================================================
     6b. Skill bars
     ================================================================== */
  function initSkillBars() {
    var bars = doc.querySelectorAll(".skill-fill");
    if (!bars.length) { return; }

    function measure(bar) {
      bar.classList.add("is-measured");
    }

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(bars, measure);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          measure(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    Array.prototype.forEach.call(bars, function (bar) {
      observer.observe(bar);
    });
  }

  /* ==================================================================
     6c. Quote hero shuffle
     ================================================================== */
  function initQuoteHero() {
    var heroText = doc.getElementById("hero-quote-text");
    var heroCite = doc.getElementById("hero-quote-cite");
    var shuffleBtn = doc.getElementById("shuffle-btn");
    if (!heroText || !heroCite || !shuffleBtn) { return; }

    var quotes = [];
    var lastIdx = -1;

    var cards = doc.querySelectorAll(".quote-card");
    Array.prototype.forEach.call(cards, function (card) {
      var p = card.querySelector("blockquote p");
      var cite = card.querySelector("cite");
      var source = card.querySelector(".quote-source");
      if (p) {
        quotes.push({
          text: p.textContent,
          cite: cite ? cite.textContent : "",
          source: source ? source.textContent : ""
        });
      }
    });

    if (quotes.length === 0) { return; }

    function pickRandom() {
      var idx;
      do {
        idx = Math.floor(Math.random() * quotes.length);
      } while (idx === lastIdx && quotes.length > 1);
      lastIdx = idx;
      return quotes[idx];
    }

    function showQuote() {
      var q = pickRandom();
      heroText.style.opacity = "0";
      heroText.style.transform = "translateY(8px)";
      setTimeout(function () {
        heroText.textContent = q.text;
        heroCite.textContent = q.cite;
        if (q.source) {
          heroCite.appendChild(doc.createTextNode(", "));
          var srcSpan = doc.createElement("span");
          srcSpan.className = "quote-source";
          srcSpan.textContent = q.source;
          heroCite.appendChild(srcSpan);
        }
        heroText.style.opacity = "1";
        heroText.style.transform = "translateY(0)";
      }, 180);
    }

    shuffleBtn.addEventListener("click", function () {
      showQuote();
    });
  }

  /* ==================================================================
     6d. Quote filter
     ================================================================== */
  function initQuoteFilter() {
    var grid = doc.querySelector(".quote-grid");
    if (!grid) { return; }

    var buttons = doc.querySelectorAll(".filter-bar .filter-button");
    var items = grid.querySelectorAll(".quote-card");
    var status = doc.querySelector(".filter-status");

    function applyFilter(filter) {
      var shown = 0;
      Array.prototype.forEach.call(items, function (item) {
        var cat = item.getAttribute("data-category") || "";
        var matches = filter === "all" || cat === filter;
        item.classList.toggle("is-hidden", !matches);
        if (matches) { shown += 1; }
      });

      if (status) {
        status.textContent = filter === "all"
          ? "Showing all " + shown + " quotes."
          : "Showing " + shown + " quote" + (shown === 1 ? "" : "s") +
            " in \u201C" + filter + "\u201D.";
      }
    }

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        Array.prototype.forEach.call(buttons, function (other) {
          var active = other === button;
          other.classList.toggle("is-active", active);
          other.setAttribute("aria-pressed", active ? "true" : "false");
        });
        applyFilter(button.getAttribute("data-filter"));
      });
    });

    applyFilter("all");
  }

  /* ==================================================================
     Boot
     ================================================================== */
  function init() {
    initContactForm();
    initProjectFilter();
    initScrollReveal();
    initSkillBars();
    initQuoteHero();
    initQuoteFilter();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();