// ===============================
// js/catalog.js — Рендер каталога, поиск, фильтрация, сортировка
// ===============================

// Состояние каталога
const catalogState = {
  query: '',
  category: 'all',
  sort: 'default'
};

// ===============================
// Метка категории
// ===============================

function getCategoryLabel(category) {
  const labels = {
    accessories: 'Аксессуары',
    electronics: 'Электроника',
    food: 'Еда и деликатесы',
    potions: 'Зелья и снадобья',
    companions: 'Спутники и защита',
    artifacts: 'Артефакты и снаряжение'
  };
  return labels[category] || category;
}

// ===============================
// Создание карточки товара
// ===============================

function createProductCard(product) {
  const card = document.createElement('article');
  card.classList.add('product-card');
  card.dataset.productId = product.id;

  // Бейдж (Хит / Новинка / Скидка)
  if (product.badge) {
    const badge = document.createElement('span');
    badge.classList.add('product-card__badge');
    badge.textContent = product.badge;
    card.prepend(badge);
  }

  // Изображение
  if (product.image) {
    const img = document.createElement('img');
    img.classList.add('product-card__image');
    img.src = product.image;
    img.alt = product.title;
    img.loading = 'lazy';
    card.appendChild(img);
  }

  // Название
  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.textContent = product.title;
  card.appendChild(title);

  // Описание
  if (product.description) {
    const description = document.createElement('p');
    description.classList.add('product-card__description');
    description.textContent = product.description;
    card.appendChild(description);
  }

  // Цена
  const price = document.createElement('p');
  price.classList.add('product-card__price');
  price.textContent = `Цена: ${formatPrice(product.price)}`;
  card.appendChild(price);

  // Рейтинг
  if (product.rating) {
    const rating = document.createElement('p');
    rating.classList.add('product-card__rating');
    rating.textContent = `⭐ ${product.rating}`;
    card.appendChild(rating);
  }

  // Бейдж наличия
  if (!product.isAvailable) {
    card.classList.add('product-card--unavailable');
    const badge = document.createElement('span');
    badge.classList.add('product-card__badge');
    badge.textContent = 'Нет в наличии';
    card.appendChild(badge);
  }

  return card;
}

// ===============================
// Рендер карточек
// ===============================

function renderProducts(productsToRender) {
  const container = document.querySelector('[data-products-container]');
  const countEl = document.querySelector('.catalog-count');
  const emptyEl = document.querySelector('.catalog-empty');

  if (!container) return;

  // Очистка
  container.textContent = '';

  // Счётчик
  if (countEl) {
    const word = pluralize(productsToRender.length, 'товар', 'товара', 'товаров');
    countEl.textContent = `Найдено: ${productsToRender.length} ${word}`;
  }

  // Пустое состояние
  if (emptyEl) {
    emptyEl.hidden = productsToRender.length > 0;
  }

  // Создание карточек
  productsToRender.forEach((product) => {
    const card = createProductCard(product);
    container.append(card);
  });
}

// ===============================
// Рендер популярных товаров (для index.html)
// ===============================

function renderPopularProducts(count) {
  const container = document.querySelector('[data-popular-container]');
  if (!container) return;

  // Берём первые N товаров
  const popular = products.slice(0, count || 3);

  popular.forEach((product) => {
    const card = createProductCard(product);
    container.append(card);
  });
}

// ===============================
// Обновление каталога
// ===============================

function updateCatalog() {
  const prepared = getPreparedProducts(products, catalogState.query, catalogState.category, catalogState.sort);
  renderProducts(prepared);
}

// ===============================
// Обработчики событий
// ===============================

function initCatalogEvents() {
  const searchInput = document.getElementById('catalog-search');
  const categoryFilter = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort-select');

  // Поиск (input)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      catalogState.query = e.target.value;
      updateCatalog();
    });
  }

  // Фильтр категории (change)
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      catalogState.category = e.target.value;
      updateCatalog();
    });
  }

  // Сортировка (change)
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      catalogState.sort = e.target.value;
      updateCatalog();
    });
  }
}

// ===============================
// Делегирование событий на карточках
// ===============================

function initCardDelegation() {
  const container = document.querySelector('[data-products-container]');

  if (!container) return;

  container.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const productId = card.dataset.productId;
    console.log('Клик по карточке товара:', productId);
  });
}

// ===============================
// Счётчик слов (для «1 товар», «2 товара», «5 товаров»)
// ===============================

function pluralize(count, one, few, many) {
  const abs = Math.abs(count) % 100;
  const lastDigit = abs % 10;

  if (abs > 10 && abs < 20) return many;
  if (lastDigit > 1 && lastDigit < 5) return few;
  if (lastDigit === 1) return one;
  return many;
}

// ===============================
// Инициализация
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  initCatalogEvents();
  initCardDelegation();

  // Ожидание загрузки товаров из JSON
  function waitForProducts(callback) {
    if (products.length > 0) {
      callback();
    } else {
      setTimeout(() => waitForProducts(callback), 100);
    }
  }

  waitForProducts(() => {
    // Каталог товаров
    const container = document.querySelector('[data-products-container]');
    if (container) {
      updateCatalog();
    }

    // Популярные товары (главная)
    const popularContainer = document.querySelector('[data-popular-container]');
    if (popularContainer) {
      renderPopularProducts(3);
    }
  });
});
