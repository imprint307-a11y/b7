// اختيار العناصر الأساسية
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const navToggle = document.getElementById("navToggle");
const navLinksContainer = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTop");
const yearSpan = document.getElementById("year");
const skillBars = document.querySelectorAll(".skill-progress");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// السنة في الفوتر
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// تفعيل لينكات النافبار حسب السكشن الحالي
const observerOptions = {
  root: null,
  threshold: 0.4
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (navLink) {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        navLink.classList.add("active");
      }
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// موبايل منيو
if (navToggle && navLinksContainer) {
  navToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("show");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("show");
    });
  });
}

// دارك / لايت ثيم
const setTheme = (theme) => {
  if (theme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("light");
    themeToggle.textContent = "🌙";
  }
  localStorage.setItem("theme", theme);
};

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  setTheme(storedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    setTheme(isLight ? "light" : "dark");
  });
}

// زر الرجوع للأعلى
window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// أنيميشن البارز في المهارات لما تظهر في الشاشة
const skillsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const value = bar.getAttribute("data-skill-value");
          bar.style.width = value + "%";
        });
        observer.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

const skillsSection = document.getElementById("skills");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// فلترة المشاريع
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-filter");

    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      if (category === "all" || cardCategory === category) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// Animiation ظهور بسيطة للعناصر (reveal)
const revealElements = document.querySelectorAll(
  ".section, .project-card, .about-item, .hero-text, .hero-card"
);
revealElements.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// فورم الكونتاكت (بدون باك إند، بس ميسج تفاعلي)
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !subject || !message) {
      formStatus.textContent = "Please fill in all required fields.";
      formStatus.classList.remove("success");
      formStatus.classList.add("error");
      return;
    }

    // هنا تقدر تربطه مع Back-end أو خدمة إرسال إيميل
    formStatus.textContent =
      "Thank you! Your message has been recorded (demo mode).";
    formStatus.classList.remove("error");
    formStatus.classList.add("success");

    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = "";
    }, 4000);
  });
}
