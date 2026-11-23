// ===============================
// 0. Загрузка шапки и подвала из partials/
// ===============================

// fetch() не подчиняется тегу <base>, поэтому путь абсолютный от сайта
Promise.all([
  fetch('partials/header.html').then((r) => r.text()),
  fetch('partials/footer.html').then((r) => r.text()),
]).then(([headerHtml, footerHtml]) => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      headerPlaceholder.outerHTML = headerHtml;
      setActiveNavLink();
      initBurgerMenu();
    }
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      footerPlaceholder.outerHTML = footerHtml;
    }
  });

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isProductPage = currentPage.endsWith('.html') && window.location.pathname.includes('/products/');
  const navLinks = document.querySelectorAll('.site-nav__link');
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('site-nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
    if (isProductPage && href === 'catalog.html') {
      link.classList.add('site-nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// ===============================
// 0.5. Бургер-меню (мобильная навигация)
// ===============================

function initBurgerMenu() {
  const burgerBtn = document.querySelector('.burger-btn');
  const siteNav = document.getElementById('site-nav');

  if (!burgerBtn || !siteNav) return;

  burgerBtn.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('site-nav--open');
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    burgerBtn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  // Закрыть меню при клике на ссылку
  siteNav.querySelectorAll('.site-nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('site-nav--open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.setAttribute('aria-label', 'Открыть меню');
    });
  });
}

// ===============================
// 1. Модальное окно (dialog)
// ===============================

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button, .product-detail__order-btn');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderButtons.length > 0 && orderDialog && selectedProductInput) {
  orderButtons.forEach((button) => {
    const productName = button.dataset.product;
    selectedProductInput.value = productName || '';
    button.addEventListener('click', () => {
      orderDialog.showModal();
    });
  });
}

if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// ===============================
// 2. Валидация формы в модальном окне
// ===============================

const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm && successMessage) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    successMessage.hidden = false;
    orderForm.reset();
    orderDialog.close();

    setTimeout(() => {
      successMessage.hidden = true;
    }, 5000);
  });
}

// ===============================
// 3. Форма на странице order.html
// ===============================

const orderFormPage = document.getElementById('order-form-page');
const successMessagePage = document.getElementById('success-message-page');

if (orderFormPage && successMessagePage) {
  orderFormPage.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderFormPage.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderFormPage.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderFormPage.reportValidity();
      return;
    }

    successMessagePage.hidden = false;
    orderFormPage.reset();

    setTimeout(() => {
      successMessagePage.hidden = true;
    }, 5000);
  });
}

// ===============================
// 4. Кнопка «Наверх» (scroll-top)
// ===============================

const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===============================
// 5. Форма обратной связи (contacts.html)
// ===============================

const feedbackForm = document.getElementById('feedback-form');
const successMessageFeedback = document.getElementById('success-message-feedback');

if (feedbackForm && successMessageFeedback) {
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(feedbackForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!feedbackForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      feedbackForm.reportValidity();
      return;
    }

    successMessageFeedback.hidden = false;
    feedbackForm.reset();

    setTimeout(() => {
      successMessageFeedback.hidden = true;
    }, 5000);
  });
}

// ===============================
// 6. Практика 15 — Вывод данных товара через JS
// ===============================

(function initProductOutput() {
  const messageEl = document.querySelector('.js-message');
  const outputEl = document.getElementById('product-output');

  // Проверка наличия элементов на странице
  if (messageEl) {
    messageEl.textContent = 'JavaScript подключён корректно.';
  }

  if (outputEl && typeof product !== 'undefined') {
    const summary = createProductSummary(product);
    outputEl.textContent = summary;

    // Вывод в консоль
    console.log('Товар:', product);
    console.log('Форматированная цена:', formatPrice(product.price));
    console.log('Скидка:', calculateDiscount(product.price, product.discountPercent));
    console.log('Итоговая цена:', calculateFinalPrice(product.price, product.discountPercent));
    console.log('Статус:', getProductStatus(product));
    console.log('Сводка:', summary);
    console.table({
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      discountPercent: product.discountPercent,
      finalPrice: calculateFinalPrice(product.price, product.discountPercent),
      rating: product.rating,
      isAvailable: product.isAvailable
    });
  }
})();
