// ===============================
// Данные товара
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
// Функции обработки данных
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
