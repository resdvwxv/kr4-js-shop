# Контрольная работа №4

Тема: «JavaScript: интерактивность, DOM, события, формы и валидация».

## Описание

Проект представляет собой интерактивную версию учебного интернет-магазина на чистом JavaScript.

## Структура проекта

```
kr4-js-shop/
├── index.html, catalog.html, product.html, order.html, contacts.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── data.js        — объект товара, массив товаров, функции обработки
│   ├── main.js        — общая инициализация, DOM-манипуляции, события
│   ├── catalog.js     — рендер каталога, поиск, фильтрация, сортировка
│   └── validation.js  — базовая валидация форм
├── images/
├── partials/
│   ├── header.html
│   └── footer.html
├── products/
├── README.md
└── .gitignore
```

## JS-файлы

### `js/data.js`
Содержит объект товара (`product`) и массив товаров (`products`) с полями: `id`, `title`, `category`, `price`, `discountPercent`, `rating`, `isAvailable`.

**Функции Практики 15:**
- `formatPrice(price)` — форматирование цены с единицей «руб.»
- `calculateDiscount(price, discountPercent)` — расчёт суммы скидки
- `calculateFinalPrice(price, discountPercent)` — расчёт итоговой цены
- `getProductStatus(product)` — определение статуса наличия
- `createProductSummary(product)` — создание текстовой сводки о товаре

**Функции Практики 16:**
- `searchProducts(products, query)` — поиск по названию
- `filterProductsByCategory(products, category)` — фильтрация по категории
- `sortProductsByPrice(products, direction)` — сортировка по цене (asc/desc)
- `sortProductsByTitle(products)` — сортировка по названию (А-Я)
- `countAvailableProducts(products)` — подсчёт доступных товаров
- `calculateTotalPrice(products)` — общая цена через `reduce`
- `calculateAveragePrice(products)` — средняя цена
- `getPreparedProducts(products, query, category, sortDirection)` — комбинирование поиска, фильтра, сортировки

### `js/main.js`
Подключает шапку и подвал из `partials/`, управляет модальным окном (`dialog`), обрабатывает формы с валидацией, реализует кнопку «Наверх».  
- **Практика 15** — блок вывода данных товара через `textContent`.
- **Практика 16** — вывод массива товаров, методов `forEach`, `map`, `filter`, `find`, `sort`, `reduce`, результатов поиска, фильтрации, сортировки и расчётов.

### `js/catalog.js`
**Практика 17** — рендер каталога через DOM:
- `createProductCard(product)` — создание карточки через `createElement`, `classList`, `textContent`, `dataset`
- `renderProducts(productsToRender)` — очистка контейнера, создание карточек, счётчик, пустое состояние
- `updateCatalog()` — получение подготовленных данных, вызов `renderProducts`
- Обработчики `input` (поиск), `change` (фильтр, сортировка) через `addEventListener`
- Делегирование событий на контейнере карточек
- `catalogState` — состояние каталога (query, category, sort)

### `js/validation.js`
**Практика 17** — валидация форм:
- `showError(input, message)` — вывод ошибки через `textContent`, `aria-invalid`
- `clearError(input)` — удаление ошибки
- `validateRequired`, `validateEmail`, `validatePhone`, `validateCheckbox` — проверка полей
- Валидация формы в модальном окне, на `order.html`, на `contacts.html`
- Ошибки выводятся на страницу, не через `alert()`

## Безопасный вывод: `textContent` vs `innerHTML`

| Метод | Поведение | Безопасность |
|---|---|---|
| `textContent` | Выводит данные как обычный текст | ✅ Безопасно — HTML-теги не интерпретируются |
| `innerHTML` | Вставляет HTML-разметку | ❌ Опасно — пользовательский HTML может выполнить вредоносный JavaScript (XSS) |

**Правило:** для пользовательских данных, формы, `localStorage`, API — всегда использовать `textContent`. `innerHTML` допустим только для статической контролируемой разметки, которую сам разработчик написал в HTML-файле.

```javascript
// ❌ Небезопасно — пользовательский HTML выполнится
element.innerHTML = userInput;

// ✅ Безопасно — выводит как обычный текст
element.textContent = userInput;
```

## Практики

- **Практика 15** — подключение скриптов, переменные, типы данных, объект товара, функции расчёта, безопасный вывод через `textContent`.
- **Практика 16** — массив товаров, поиск, фильтрация, сортировка.
- **Практика 17** — DOM, события, рендер каталога, валидация формы.

## Подключение скриптов

Скрипты подключаются с атрибутом `defer` — они выполняются после разбора HTML:

```html
<script src="js/data.js" defer></script>
<script src="js/main.js" defer></script>
<script src="js/catalog.js" defer></script>
<script src="js/validation.js" defer></script>
```

Порядок важен: `data.js` подключается первым — он содержит данные и функции, которые используют остальные файлы.
