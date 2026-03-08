(() => {
  const nav = document.querySelector('.navbar');

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 8);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('active');
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const alert = document.getElementById('formAlert');
      if (alert) alert.classList.remove('d-none');
      form.reset();
    });
  }

  const navbarCollapse = document.getElementById('navbarNav');
  const navLinks = document.querySelectorAll('#navbarNav .nav-link');

  if (navbarCollapse && navLinks.length && window.bootstrap) {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
          const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
          bsCollapse.hide();
        }
      });
    });
  }
})();
