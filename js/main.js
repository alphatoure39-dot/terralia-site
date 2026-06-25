/* ─── CONFIG ──────────────────────────────────────────────────────────────── */
const CONFIG = {
  brandName: 'Terralia',
  appUrl:    'https://terralia-app.vercel.app',
  heroTitle: 'Gérez toute votre ferme depuis un seul endroit',
};

/* ─── INIT ────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initConfig();
  initHeader();
  initMobileMenu();
  initReveal();
  initFaq();
  initDemo();
});

/* ─── CONFIG TOKENS ───────────────────────────────────────────────────────── */
function initConfig() {
  document.querySelectorAll('[data-brand]').forEach(el => { el.textContent = CONFIG.brandName; });
  document.querySelectorAll('[data-app-url]').forEach(el => {
    el.href = CONFIG.appUrl;
    if (el.tagName === 'A') el.rel = 'noopener';
  });
  const heroTitleEl = document.querySelector('[data-hero-title]');
  if (heroTitleEl) heroTitleEl.textContent = CONFIG.heroTitle;
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ─── STICKY HEADER ───────────────────────────────────────────────────────── */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── MOBILE MENU ─────────────────────────────────────────────────────────── */
function initMobileMenu() {
  const burger = document.querySelector('.btn-burger');
  const menu   = document.querySelector('.nav-mobile');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

/* ─── SCROLL REVEAL ───────────────────────────────────────────────────────── */
function initReveal() {
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!els.length) return;

  const animateIn = (el) => {
    try {
      el.animate(
        [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }],
        { duration: 620, easing: 'cubic-bezier(.16,.84,.44,1)', fill: 'backwards' }
      );
    } catch (_) {}
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateIn(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    requestAnimationFrame(() => {
      const vh = window.innerHeight || 800;
      els.forEach(el => {
        if (el.getBoundingClientRect().top >= vh) io.observe(el);
      });
    });
  }
}

/* ─── FAQ ACCORDION ───────────────────────────────────────────────────────── */
function initFaq() {
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ─── DEMO MODAL ──────────────────────────────────────────────────────────── */
function initDemo() {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;

  const open  = () => overlay.classList.add('open');
  const close = () => overlay.classList.remove('open');

  document.querySelectorAll('[data-open-demo]').forEach(el => el.addEventListener('click', open));
  document.querySelector('.modal-close')?.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
