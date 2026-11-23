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
Содержит объект товара (`product`) с полями: `id`, `title`, `category`, `price`, `discountPercent`, `rating`, `isAvailable`.  
Также содержит функции обработки:
- `formatPrice(price)` — форматирование цены с единицей «руб.»
- `calculateDiscount(price, discountPercent)` — расчёт суммы скидки
- `calculateFinalPrice(price, discountPercent)` — расчёт итоговой цены
- `getProductStatus(product)` — определение статуса наличия
- `createProductSummary(product)` — создание текстовой сводки о товаре

### `js/main.js`
Подключает шапку и подвал из `partials/`, управляет модальным окном (`dialog`), обрабатывает формы с валидацией, реализует кнопку «Наверх».  
На Практике 15 добавлен блок вывода данных товара через `textContent`.

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
```

Порядок важен: `data.js` подключается до `main.js`.
