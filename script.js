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


  // Lead form: button label by request type
  const leadForm = document.getElementById('lead-form');
  const leadSubmit = document.getElementById('lead-submit');
  const requestSelect = leadForm?.querySelector('select[name="request"]');
  const updateLeadBtn = () => {
    if (!leadSubmit || !requestSelect) return;
    const v = requestSelect.value;
    if (v === 'tour') leadSubmit.textContent = 'Записаться на экскурсию';
    else if (v === 'interview') leadSubmit.textContent = 'Записаться на собеседование';
    else leadSubmit.textContent = 'Оставить заявку';
  };
  requestSelect?.addEventListener('change', updateLeadBtn);

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


  // Hero background slideshow
  const heroSlides = document.querySelectorAll('.hero__slide');
  if (heroSlides.length > 1) {
    let heroIndex = 0;
    setInterval(() => {
      heroSlides[heroIndex].classList.remove('is-active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('is-active');
    }, 6000);
  }


  // Extra-education cards reveal
  const eeCards = document.querySelectorAll('.ee-card');
  if (eeCards.length) {
    const eeObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          eeObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
    eeCards.forEach((card, i) => {
      card.style.transitionDelay = `${(i % 4) * 0.08}s`;
      eeObs.observe(card);
    });
  }


  // Admission page reveals
  const admEls = document.querySelectorAll('.adm-step, .adm-campus');
  if (admEls.length) {
    const admObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          admObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    admEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 0.1}s`;
      admObs.observe(el);
    });
  }


  // Lead modal
  const leadModal = document.getElementById('lead-modal');
  const openLeadModal = (request) => {
    if (!leadModal) return;
    const sel = leadModal.querySelector('select[name="request"]');
    const btn = document.getElementById('lead-submit-modal');
    if (sel && request) {
      sel.value = request;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (btn) {
      if (request === 'tour') btn.textContent = 'Записаться на экскурсию';
      else if (request === 'interview') btn.textContent = 'Записаться на собеседование';
      else btn.textContent = 'Оставить заявку';
    }
    leadModal.classList.add('is-open');
    leadModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lead-modal-open');
  };
  const closeLeadModal = () => {
    if (!leadModal) return;
    leadModal.classList.remove('is-open');
    leadModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lead-modal-open');
  };
  document.querySelectorAll('.js-open-lead').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openLeadModal(el.dataset.request || '');
    });
  });
  leadModal?.querySelectorAll('[data-close-lead]').forEach((el) => {
    el.addEventListener('click', closeLeadModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLeadModal();
  });
  const modalForm = document.getElementById('lead-form-modal');
  const modalRequest = modalForm?.querySelector('select[name="request"]');
  modalRequest?.addEventListener('change', () => {
    const btn = document.getElementById('lead-submit-modal');
    if (!btn) return;
    const v = modalRequest.value;
    if (v === 'tour') btn.textContent = 'Записаться на экскурсию';
    else if (v === 'interview') btn.textContent = 'Записаться на собеседование';
    else btn.textContent = 'Оставить заявку';
  });
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('lead-submit-modal');
      const original = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.disabled = true;
      btn.style.background = 'var(--color-success)';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        modalForm.reset();
        closeLeadModal();
      }, 2000);
    });
  }

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
