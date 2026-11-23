// ===============================
// Данные товара (Практика 15)
// ===============================

const product = {
  id: 1,
  title: 'Кофемашина Barista Home',
  category: 'kitchen',
  price: 19990,
  discountPercent: 10,
  rating: 4.7,
  isAvailable: true
};

// ===============================
// Массив товаров (Практика 16)
// ===============================

const products = [
  { id: 1, title: 'Кофемашина Barista Home', category: 'kitchen', price: 19990, discountPercent: 10, rating: 4.7, isAvailable: true },
  { id: 2, title: 'Электрический чайник SmartHeat', category: 'kitchen', price: 4990, discountPercent: 0, rating: 4.3, isAvailable: true },
  { id: 3, title: 'Блендер MixPro', category: 'kitchen', price: 3990, discountPercent: 15, rating: 4.5, isAvailable: true },
  { id: 4, title: 'Тостер CrispMaster', category: 'kitchen', price: 2490, discountPercent: 0, rating: 4.1, isAvailable: false },
  { id: 5, title: 'Наушники SoundMax Pro', category: 'electronics', price: 8990, discountPercent: 20, rating: 4.8, isAvailable: true },
  { id: 6, title: 'Клавиатура KeyForce RGB', category: 'electronics', price: 5490, discountPercent: 5, rating: 4.4, isAvailable: true },
  { id: 7, title: 'Мышь ClickElite', category: 'electronics', price: 2990, discountPercent: 0, rating: 4.2, isAvailable: true },
  { id: 8, title: 'Монитор ViewWide 27"', category: 'electronics', price: 24990, discountPercent: 10, rating: 4.6, isAvailable: true },
  { id: 9, title: 'Рюкзак UrbanPack', category: 'accessories', price: 3490, discountPercent: 0, rating: 4.3, isAvailable: true },
  { id: 10, title: 'Чехол для ноутбука', category: 'accessories', price: 1990, discountPercent: 0, rating: 4.0, isAvailable: true },
  { id: 11, title: 'Подставка для ноутбука', category: 'accessories', price: 2790, discountPercent: 10, rating: 4.5, isAvailable: false },
  { id: 12, title: 'LED-лампа DeskLight', category: 'accessories', price: 1490, discountPercent: 0, rating: 4.1, isAvailable: true }
];

// ===============================
// Функции обработки данных (Практика 15)
// ===============================

function formatPrice(price) {
  return `${price} руб.`;
}

function calculateDiscount(price, discountPercent) {
  return price * discountPercent / 100;
}

function calculateFinalPrice(price, discountPercent) {
  const discountValue = calculateDiscount(price, discountPercent);
  return price - discountValue;
}

function getProductStatus(product) {
  if (product.isAvailable) return 'В наличии';
  return 'Нет в наличии';
}

function createProductSummary(product) {
  const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
  const status = getProductStatus(product);
  return `${product.title}: ${formatPrice(finalPrice)}. Статус: ${status}.`;
}

// ===============================
// Функции каталога (Практика 16)
// ===============================

// Поиск по названию
function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === '') return products;
  return products.filter((p) => p.title.toLowerCase().includes(normalizedQuery));
}

// Фильтрация по категории
function filterProductsByCategory(products, category) {
  if (category === 'all') return [...products];
  return products.filter((p) => p.category === category);
}

// Сортировка по цене
function sortProductsByPrice(products, direction = 'asc') {
  const copy = [...products];
  if (direction === 'desc') return copy.sort((a, b) => b.price - a.price);
  return copy.sort((a, b) => a.price - b.price);
}

// Сортировка по названию
function sortProductsByTitle(products) {
  const copy = [...products];
  return copy.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
}

// Расчёты
function countAvailableProducts(products) {
  return products.filter((p) => p.isAvailable).length;
}

function calculateTotalPrice(products) {
  return products.reduce((sum, p) => sum + p.price, 0);
}

function calculateAveragePrice(products) {
  if (products.length === 0) return 0;
  return Math.round(calculateTotalPrice(products) / products.length);
}

// Комбинирование: поиск + фильтр + сортировка
function getPreparedProducts(products, query, category, sortDirection) {
  let result = [...products];
  result = searchProducts(result, query);
  result = filterProductsByCategory(result, category);
  if (sortDirection === 'price-asc') {
    result = sortProductsByPrice(result, 'asc');
  } else if (sortDirection === 'price-desc') {
    result = sortProductsByPrice(result, 'desc');
  } else if (sortDirection === 'title') {
    result = sortProductsByTitle(result);
  }
  return result;
}
