document.documentElement.classList.add("js");

(function () {
  "use strict";

  /* ---------- Resume data ---------- */
  var EXP = [
    {
      when: "2025 to now",
      role: "Mid-Level Frontend Engineer",
      org: "Ascent Tech Hub Africa",
      pts: [
        "Build and maintain production web applications with React, Next.js and TypeScript.",
      ],
    },
    {
      when: "2024 to 2025",
      role: "Junior Frontend Engineer",
      org: "Freelance",
      pts: [
        "Built websites and web apps for independent clients, from landing pages to full applications.",
      ],
    },
    {
      when: "2023 to 2024",
      role: "Frontend Developer Intern",
      org: "Justweb Technology",
      pts: ["Built responsive interfaces as part of the frontend team."],
    },
    {
      when: "2023 to 2024",
      role: "UI/UX Intern",
      org: "Justweb Technology",
      pts: ["Worked on interface design alongside the development team."],
    },
  ];
  var SERVICES = [
    "Frontend development",
    "Responsive design",
    "UI implementation",
    "Landing pages",
    "Performance optimisation",
    "Maintenance and support",
  ];

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt) n.textContent = txt;
    return n;
  }
  var tl = document.getElementById("tl");
  EXP.forEach(function (x, i) {
    var li = el("li", "rv");
    li.style.setProperty("--d", i * 0.08 + "s");
    li.appendChild(el("div", "when", x.when));
    li.appendChild(el("h3", "", x.role));
    li.appendChild(el("div", "org", x.org));
    var ul = el("ul");
    x.pts.forEach(function (p) {
      ul.appendChild(el("li", "", p));
    });
    li.appendChild(ul);
    tl.appendChild(li);
  });
  var sv = document.getElementById("services");
  SERVICES.forEach(function (s) {
    sv.appendChild(el("li", "", s));
  });

  function resumeText() {
    var out = [
      "Topzy",
      "Frontend engineer",
      "oluwazegun005@gmail.com",
      "",
      "EXPERIENCE",
    ];
    EXP.forEach(function (x) {
      out.push(x.role + ", " + x.org + " (" + x.when + ")");
      x.pts.forEach(function (p) {
        out.push("- " + p);
      });
      out.push("");
    });
    out.push(
      "SKILLS",
      "React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion, GSAP, TanStack, Redux, Zod, Supabase, Appwrite, Firebase, Node.js, Figma, Git, GitHub",
      "",
      "SERVICES",
    );
    SERVICES.forEach(function (s) {
      out.push("- " + s);
    });
    return out.join("\n");
  }

  /* ---------- Copy buttons ---------- */
  function copyWith(btn, text) {
    var label = btn.querySelector("span");
    var old = label.textContent;
    function ok() {
      label.textContent = "Copied";
      setTimeout(function () {
        label.textContent = old;
      }, 1400);
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        if (document.execCommand("copy")) ok();
      } catch (e) {}
      document.body.removeChild(ta);
    }
    try {
      navigator.clipboard.writeText(text).then(ok, fallback);
    } catch (e) {
      fallback();
    }
  }
  document.getElementById("copyEmail").addEventListener("click", function () {
    copyWith(this, document.getElementById("email").textContent);
  });
  document.getElementById("copyResume").addEventListener("click", function () {
    copyWith(this, resumeText());
  });

  /* ---------- Smooth scroll + menu ---------- */
  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menuBtn");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-go]");
    if (!a) return;
    e.preventDefault();
    var target = document.getElementById(a.getAttribute("data-go"));
    if (!target) return;
    setMenu(false);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  });

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  try {
    var t = localStorage.getItem("tz-theme");
    if (t === "dark" || t === "light") root.setAttribute("data-theme", t);
  } catch (e) {}
  document.getElementById("theme").addEventListener("click", function () {
    var cur =
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("tz-theme", next);
    } catch (e) {}
  });

  /* ---------- Project details ---------- */
  Array.prototype.forEach.call(
    document.querySelectorAll(".more"),
    function (b) {
      b.addEventListener("click", function () {
        var d = b.parentNode.querySelector(".detail");
        var open = !d.classList.contains("open");
        d.classList.toggle("open", open);
        b.setAttribute("aria-expanded", open ? "true" : "false");
        b.firstChild.textContent = open ? "Hide details " : "Details ";
      });
    },
  );

  /* ---------- Reveal on scroll ---------- */
  Array.prototype.forEach.call(
    document.querySelectorAll(".stagger"),
    function (p) {
      Array.prototype.forEach.call(
        p.querySelectorAll(":scope > .rv"),
        function (c, i) {
          c.style.setProperty("--d", i * 0.09 + "s");
        },
      );
    },
  );
  var rvs = Array.prototype.slice.call(document.querySelectorAll(".rv"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    rvs.forEach(function (n) {
      io.observe(n);
    });
    setTimeout(function () {
      rvs.forEach(function (n) {
        if (n.getBoundingClientRect().top < window.innerHeight * 1.1)
          n.classList.add("in");
      });
    }, 900);
  } else {
    rvs.forEach(function (n) {
      n.classList.add("in");
    });
  }

  /* ---------- Active nav, progress, header shadow ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var secs = ["about", "skills", "projects", "resume", "contact"].map(
    function (id) {
      return document.getElementById(id);
    },
  );
  var bar = document.getElementById("bar");
  var prog = document.getElementById("progress");
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.transform =
      "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    bar.classList.toggle("scrolled", y > 8);
    var cur = "";
    secs.forEach(function (s) {
      if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-go") === cur);
    });
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", onScroll);
  onScroll();

  document.getElementById("yr").textContent = new Date().getFullYear();
})();
