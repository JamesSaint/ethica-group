/* =========================================================
   ETHICA GROUP — Core UI Behaviour
   - Navbar scroll state
   - Active navigation highlighting
   - Mobile nav close on link click
   - Footer year
   - Demo contact form handling
   ========================================================= */
(() => {
  const nav = document.querySelector('.navbar');
  const navbarCollapse = document.getElementById('navbarNav');

  // Add a scrolled style once the page moves slightly.
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 8);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight the current page in the navigation.
  const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (href === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Keep the copyright year current.
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Demo form handling. Replace the action attribute with a live endpoint when ready.
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      if (!form.getAttribute('action')) {
        event.preventDefault();
        const alert = document.getElementById('formAlert');
        if (alert) {
          alert.classList.remove('d-none');
          alert.classList.remove('alert-danger');
          alert.classList.add('alert-success');
        }
        form.reset();
      }
    });
  }

  // Close the mobile menu after a navigation link is selected.
  if (navbarCollapse && window.bootstrap) {
    document.querySelectorAll('#navbarNav .nav-link, #navbarNav .btn').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
          const instance = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
          instance.hide();
        }
      });
    });
  }
})();
