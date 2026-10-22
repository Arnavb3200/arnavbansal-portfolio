(function () {
  "use strict";
  var root = document.documentElement;
  var themeToggle = document.querySelector(".theme-toggle");
  var themeIcon = document.querySelector(".theme-toggle-icon");
  var themeText = document.querySelector(".theme-toggle-text");
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  var navLinks = document.querySelectorAll(".site-nav a");
  var yearEl = document.getElementById("year");
  var profilePhoto = document.getElementById("profile-photo");
  var profileFallback = document.getElementById("profile-fallback");
  var storageKey = "arnav-portfolio-theme";
  function preferredTheme() {
    var saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var isDark = theme === "dark";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }
    if (themeText) {
      themeText.textContent = isDark ? "Light" : "Dark";
    }
  }
  applyTheme(preferredTheme());
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }
  function setNavOpen(isOpen) {
    if (!siteNav || !navToggle) {
      return;
    }
    siteNav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  }
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!siteNav.classList.contains("is-open"));
    });
  }
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
  function showPhotoFallback() {
    if (profilePhoto) {
      profilePhoto.hidden = true;
    }
    if (profileFallback) {
      profileFallback.hidden = false;
    }
  }
  if (profilePhoto) {
    profilePhoto.addEventListener("error", showPhotoFallback);
    if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
      showPhotoFallback();
    }
  }
  var sections = document.querySelectorAll("main section[id]");
  function updateActiveNav() {
    var current = "";
    sections.forEach(function (section) {
      var top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === "#" + current);
    });
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
})();
