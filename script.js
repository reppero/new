/**
 * Interschool — Interactive scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky header shadow
  const header = document.getElementById('header');
  const mark = document.getElementById('mark');
  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
	  mark.classList.add('logo__mark__scrolled');
    } else {
      header.classList.remove('scrolled');
	  mark.classList.remove('logo__mark__scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      burger.classList.toggle('active');
    });

    // Close menu on link click (including dropdown)
    nav.querySelectorAll('.nav__link, .nav__dropdown-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('active');
      });
    });
  }

  // Simple form handler (demo)
  const form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.disabled = true;
      btn.style.background = 'var(--color-success)';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 2500);
    });
  }

  // Smooth reveal on scroll (simple)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.adv-block, .step, .news-card, .school-card, .contact-card')
    .forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });

  // Add visible class styles via JS
  const style = document.createElement('style');
  style.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Teachers pagination — 4 cards per page
  const PER_PAGE = 4;

  document.querySelectorAll('.teachers-section').forEach((section) => {
    const cards = Array.from(section.querySelectorAll('.teacher-card'));
    const pager = section.querySelector('.teachers-pager');
    if (!pager || cards.length === 0) return;

    const prevBtn = pager.querySelector('.teachers-pager__btn:first-child');
    const nextBtn = pager.querySelector('.teachers-pager__btn:last-child');
    const info = pager.querySelector('.teachers-pager__info');
    const totalPages = Math.max(1, Math.ceil(cards.length / PER_PAGE));
    let page = 0;

    // Hide pager if only one page
    if (totalPages <= 1) {
      pager.style.display = 'none';
      return;
    }

    const render = () => {
      cards.forEach((card, i) => {
        const start = page * PER_PAGE;
        const end = start + PER_PAGE;
        card.hidden = i < start || i >= end;
      });
      if (info) info.textContent = `${page + 1}/${totalPages}`;
      if (prevBtn) prevBtn.disabled = page === 0;
      if (nextBtn) nextBtn.disabled = page >= totalPages - 1;
    };

    prevBtn?.addEventListener('click', () => {
      if (page > 0) {
        page -= 1;
        render();
      }
    });

    nextBtn?.addEventListener('click', () => {
      if (page < totalPages - 1) {
        page += 1;
        render();
      }
    });

    render();
  });
});
