function hidePreloader() {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  preloader.classList.add("hide-loader");

  setTimeout(() => {
    preloader.style.display = "none";
  }, 800);
}

window.addEventListener("load", () => {
  setTimeout(hidePreloader, 800);
});


document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  const navItems = document.querySelectorAll(".custom-nav-item");
  const navLinks = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(
    "#home, #Experience, #Skill, #project, #contact"
  );

  let isManualScrolling = false;
  let animationFrameId = null;

  // Mobile Menu
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");

      menuBtn.setAttribute(
        "aria-expanded",
        navMenu.classList.contains("hidden") ? "false" : "true"
      );
    });
  }

  // Active Navbar
  function setActiveNav(id) {
    navItems.forEach((item) => {
      item.classList.remove("active");

      const link = item.querySelector("a");

      if (link && link.getAttribute("href") === `#${id}`) {
        item.classList.add("active");
      }
    });
  }

  function getNavbarHeight() {
    const navbar = document.querySelector("nav");
    return navbar ? navbar.offsetHeight : 0;
  }

  // Smooth Scroll
  function smoothScrollTo(targetSection) {
    if (!targetSection) return;

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    const navbarHeight = getNavbarHeight();
    const startPosition = window.scrollY;

    const targetPosition =
      targetSection.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight +
      8;

    const distance = targetPosition - startPosition;
    const duration = 1200;
    let startTime = null;

    isManualScrolling = true;

    function easeInOutQuad(t) {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animateScroll(currentTime) {
      if (startTime === null) startTime = currentTime;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateScroll);
      } else {
        isManualScrolling = false;
      }
    }

    animationFrameId = requestAnimationFrame(animateScroll);
  }

 navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) return;

    setActiveNav(targetId.replace("#", ""));

    if (window.innerWidth < 1024 && navMenu) {
      navMenu.classList.add("hidden");

      if (menuBtn) {
        menuBtn.setAttribute("aria-expanded", "false");
      }
    }
  });
}); 

  // Observer for scroll active state
  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-120px 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Skill Card 3D Hover Effect
  document.querySelectorAll(".stat-card, .skill-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      card.style.transform = `
        perspective(400px)
        rotateY(${x * 8}deg)
        rotateX(${-y * 8}deg)
        translateY(-3px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // Particles
  const particlesContainer = document.getElementById("particles");

  if (particlesContainer) {
    const count = 28;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";

      const left = Math.random() * 100;
      const dur = 8 + Math.random() * 14;
      const delay = -Math.random() * dur;
      const dx = (Math.random() - 0.5) * 120;
      const size = 1.5 + Math.random() * 2.5;
      const opacity = 0.3 + Math.random() * 0.7;

      p.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        --dx: ${dx}px;
        animation-duration: ${dur}s;
        animation-delay: ${delay}s;
      `;

      particlesContainer.appendChild(p);
    }
  }

  // Hero Typing Effect
  const roles = ["DEVELOPER", "ENGINEER", "CREATOR"];
  const heroTitle = document.querySelector(".hero-title-2");

  if (heroTitle) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const word = roles[roleIndex];

      if (!deleting) {
        heroTitle.textContent = word.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === word.length) {
          deleting = true;
          setTimeout(tick, 2000);
          return;
        }
      } else {
        heroTitle.textContent = word.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(tick, deleting ? 60 : 100);
    }

    setTimeout(tick, 1800);
  }
});