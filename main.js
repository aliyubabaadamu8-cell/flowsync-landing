/* ════════════════════════════════════════════
   FlowSync — main.js
   - Mobile nav toggle
   - Scroll-triggered fade animations
   - Animated timer countdown
   - Active nav link highlighting
════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Mobile Nav Toggle ─── */
  const nav      = document.querySelector('.nav');
  const toggle   = document.querySelector('.nav__toggle');
  const navMenu  = document.getElementById('nav-menu');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    navMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ─── Scroll-triggered Fade Animations ─── */
  const animatables = document.querySelectorAll(
    '.feature-card, .step, .testimonial, .pricing-card, .stat-chip, .section-header'
  );

  animatables.forEach(el => el.classList.add('fade-up'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings
            const siblings = [...entry.target.parentElement.children];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, idx * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animatables.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animatables.forEach(el => el.classList.add('visible'));
  }

  /* ─── Animated Focus Timer ─── */
  const timerEl = document.querySelector('.focus-card__timer');
  if (timerEl) {
    let minutes = 47;
    let seconds = 12;

    function tick() {
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
        }
      }
      timerEl.textContent =
        String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }

    setInterval(tick, 1000);
  }

  /* ─── Active Nav on Scroll ─── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === '#' + id) {
              link.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));

  /* ─── Sticky header shadow on scroll ─── */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

})();
