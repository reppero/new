/**
 * Shared header & footer — edit only this file to update all pages.
 */
(function () {
  const isHome = /(?:^|\/)(index\.html)?$/.test(location.pathname.replace(/\/+$/, '/') ) 
    || location.pathname.endsWith('/') 
    || location.pathname.endsWith('/index.html')
    || location.pathname === '' 
    || /index\.html$/i.test(location.href.split('?')[0]);

  // More reliable: check if current script page is index
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase() || 'index.html';
  const home = page === '' || page === 'index.html';

  const INDEX = home ? '#' : 'index.html';
  const ABOUT = home ? '#about' : 'index.html#about';
  const ADMISSION = home ? '#admission' : 'index.html#admission';
  const LIFE = home ? '#life' : 'index.html#life';

  function fill(tpl) {
    return tpl
      .replaceAll('INDEX', INDEX)
      .replaceAll('ABOUT', ABOUT)
      .replaceAll('ADMISSION', ADMISSION)
      .replaceAll('LIFE', LIFE);
  }

  const headerHTML = fill(`  <header class="header" id="header">
    <div class="container header__inner">
      <a href="INDEX" class="logo">
        <span id="mark" class="logo__mark"></span>
        <span class="logo__text">Interschool</span>
      </a>
      <nav class="nav" id="nav">
        <div class="nav__item nav__item--has-sub">
          <a href="ABOUT" class="nav__link">О нас</a>
          <div class="nav__dropdown">
            <a href="ABOUT" class="nav__dropdown-link">МШГУ</a>
            <a href="ABOUT" class="nav__dropdown-link">СПбМШ</a>
          </div>
        </div>
        <div class="nav__item nav__item--has-sub">
          <a href="education-model.html" class="nav__link">Учебный процесс</a>
          <div class="nav__dropdown">
            <a href="education-model.html" class="nav__dropdown-link">Образовательная модель</a>
            <a href="learning-formats.html" class="nav__dropdown-link">Формы обучения</a>
          </div>
        </div>
        <a href="extra-education.html" class="nav__link">Дополнительное образование</a>
        <a href="teachers.html" class="nav__link">Наша команда</a>
        <div class="nav__item nav__item--has-sub">
          <a href="admission.html" class="nav__link">Поступление</a>
          <div class="nav__dropdown">
            <a href="admission.html" class="nav__dropdown-link">Как поступить</a>
            <a href="#" class="nav__dropdown-link">Документы</a>
          </div>
        </div>
        <a href="LIFE" class="nav__link">Жизнь школы</a>
      </nav>
      <div class="header__actions">
        <a href="ADMISSION" class="btn btn--primary btn--sm">Записаться</a>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`);
  const footerHTML = fill(`  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="INDEX" class="logo logo--footer">
          <span class="logo__mark"></span>
          <span class="logo__text">Interschool</span>
        </a>
        <p>Международные школы Санкт-Петербурга<br>с 1993 года</p>
      </div>
      <div class="footer__links">
        <a href="ABOUT">О нас</a>
        <a href="extra-education.html">Доп. образование</a>
        <a href="teachers.html">Наша команда</a>
        <a href="ADMISSION">Поступление</a>
      </div>
      <div class="footer__copy">
        <p>© 2026 Interschool. Все права защищены.</p>
      </div>
    </div>
  </footer>`);

  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  if (headerMount) headerMount.outerHTML = headerHTML;
  if (footerMount) footerMount.outerHTML = footerHTML;
  document.body.insertAdjacentHTML('beforeend', `
  <div class="lead-modal" id="lead-modal" aria-hidden="true">
    <div class="lead-modal__backdrop" data-close-lead></div>
    <div class="lead-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
      <button type="button" class="lead-modal__close" data-close-lead aria-label="Закрыть">×</button>
      <h3 id="lead-modal-title">Запись</h3>
      <p class="lead-modal__desc">Оставьте контакты — мы свяжемся и подберём удобное время.</p>
      <form class="form" id="lead-form-modal">
        <div class="form__row">
          <input type="text" name="name" placeholder="Ваше имя" required>
          <input type="tel" name="phone" placeholder="Телефон" required>
        </div>
        <div class="form__row">
          <select name="school" required>
            <option value="" disabled selected>Выберите школу</option>
            <option value="mshu-6-11">МШГУ · 6–11 · Восстания, 8Б</option>
            <option value="mshu-1-5">МШГУ · 1–5 · Б. Морская, 23</option>
            <option value="spbms">СПбМШ · 1–11 · Чекистов, 13</option>
          </select>
          <select name="request" required>
            <option value="" disabled selected>Цель обращения</option>
            <option value="tour">Экскурсия</option>
            <option value="interview">Собеседование</option>
          </select>
        </div>
        <div class="form__row form__row--submit">
          <button type="submit" class="btn btn--primary" id="lead-submit-modal">Оставить заявку</button>
        </div>
      </form>
    </div>
  </div>
`);
})();
