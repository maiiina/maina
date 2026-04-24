// apply saved preference on load
var toggle = document.getElementById("theme-toggle");
var body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggle.textContent = "\u263D";
}

toggle.addEventListener("click", function () {
  // spin the button
  toggle.classList.remove("spin");
  void toggle.offsetWidth;
  toggle.classList.add("spin");

  toggle.addEventListener(
    "animationend",
    function () {
      toggle.classList.remove("spin");
    },
    { once: true },
  );

  // store the button center so CSS can anchor the ripple there
  var rect = toggle.getBoundingClientRect();
  document.documentElement.style.setProperty(
    "--ripple-x",
    Math.round(rect.left + rect.width / 2) + "px",
  );
  document.documentElement.style.setProperty(
    "--ripple-y",
    Math.round(rect.top + rect.height / 2) + "px",
  );

  function applyTheme() {
    body.classList.toggle("dark");
    var isDark = body.classList.contains("dark");
    toggle.textContent = isDark ? "\u263D" : "\u2600";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // use View Transitions if the browser supports it, otherwise just swap instantly
  if (document.startViewTransition) {
    document.startViewTransition(applyTheme);
  } else {
    applyTheme();
  }
});

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// footer year
var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
