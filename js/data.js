const product = {
  id: 1,
  title: 'Шапец',
  category: 'accessories',
  price: 5000,
  discountPercent: 0,
  rating: 4.9,
  isAvailable: true
};

// ===============================
// Массив товаров — загрузка из JSON (Практика 16)
// ===============================

let products = [];

fetch('js/products.json')
  .then((response) => response.json())
  .then((data) => {
    products = data;
    console.log('Товары загружены:', products.length);
  })
  .catch(() => {
    console.error('Не удалось загрузить товары');
  });

// ===============================
// Функции обработки данных (Практика 15)
// ===============================

function formatPrice(price) {
  return `${price} кукичей`;
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
