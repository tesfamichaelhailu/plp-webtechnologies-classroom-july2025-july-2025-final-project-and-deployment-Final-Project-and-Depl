// Basic interactions: menu toggle, year, form validation, scroll reveal, project modal
document.addEventListener("DOMContentLoaded", () => {
  // menu toggle
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // footer year
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // form validation
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const msg = form.querySelector("#message");
      const status = document.getElementById("form-status");
      if (!name.value.trim() || name.value.trim().length < 2) {
        status.textContent = "Please enter your name (2+ chars).";
        name.focus();
        return;
      }
      if (!email.checkValidity()) {
        status.textContent = "Please enter a valid email.";
        email.focus();
        return;
      }
      if (!msg.value.trim() || msg.value.trim().length < 10) {
        status.textContent = "Message must be at least 10 characters.";
        msg.focus();
        return;
      }
      // here you would send with fetch to a serverless function or email provider
      status.textContent = "Thanks — message sent (demo).";
      form.reset();
    });
  }

  // IntersectionObserver for reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // project modal
  const modal = document.getElementById("modal");
  const modalFrame = document.getElementById("modal-frame");
  const modalClose = document.getElementById("modal-close");
  document.querySelectorAll(".open-project").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.src;
      modalFrame.src = src;
      modal.setAttribute("aria-hidden", "false");
    });
  });
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.setAttribute("aria-hidden", "true");
      modalFrame.src = "";
    });
  }
  // close modal on outside click
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.setAttribute("aria-hidden", "true");
        modalFrame.src = "";
      }
    });
  }
});
