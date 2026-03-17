(() => {
  const nav = document.querySelector(".navbar");

  /* Navbar scroll state */
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Active nav link */
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === path) {
      link.classList.add("active");
    }
  });

  /* Footer year */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Mobile nav auto-close */
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");

  if (navbarCollapse && navLinks.length && window.bootstrap) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
          const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
          collapseInstance.hide();
        }
      });
    });
  }

  /* Editorial reveal */
  const appearElements = document.querySelectorAll("[data-appear]");

  if (appearElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    appearElements.forEach((el) => observer.observe(el));
  }

  /* Contact form with Formspree */
  const form = document.querySelector("[data-contact-form]");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const alertBox = document.getElementById("formAlert");
      const submitButton = form.querySelector("button[type='submit']");

      if (!submitButton) return;

      if (alertBox) {
        alertBox.classList.add("d-none");
        alertBox.classList.remove("alert-danger");
        alertBox.classList.add("alert-success");
        alertBox.textContent = "Thank you. Your message has been sent and we will respond shortly.";
      }

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          form.reset();

          if (alertBox) {
            alertBox.classList.remove("d-none", "alert-danger");
            alertBox.classList.add("alert-success");
            alertBox.textContent = "Thank you. Your message has been sent and we will respond shortly.";
          }
        } else {
          let errorMessage = "Something went wrong. Please try again.";

          try {
            const data = await response.json();
            if (data && Array.isArray(data.errors) && data.errors.length > 0) {
              errorMessage = data.errors.map((err) => err.message).join(" ");
            }
          } catch (_) {
            /* keep default message */
          }

          if (alertBox) {
            alertBox.classList.remove("d-none", "alert-success");
            alertBox.classList.add("alert-danger");
            alertBox.textContent = errorMessage;
          }
        }
      } catch (error) {
        if (alertBox) {
          alertBox.classList.remove("d-none", "alert-success");
          alertBox.classList.add("alert-danger");
          alertBox.textContent = "Network error. Please try again.";
        }
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send enquiry";
      }
    });
  }
})();