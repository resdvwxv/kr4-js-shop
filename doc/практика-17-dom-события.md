# Практика #17 — DOM, события, поиск, фильтрация, сортировка, валидация формы

## Цель

Связать JavaScript-данные интернет-магазина с HTML-страницами: вывести карточки товаров в DOM, подключить поиск, фильтрацию и сортировку к интерфейсу, реализовать базовую валидацию формы заявки.

**Навыки:** `querySelector`, `createElement`, `textContent`, `classList`, `dataset`, `addEventListener`, делегирование событий, `preventDefault()`, отладка (Console, Breakpoints).
## Проектный паттерн

```
элементы страницы → события пользователя → обновление состояния → повторный рендер
```

Данные (`products`) → функции обработки (`search`, `filter`, `sort`) → `catalogState` → `renderProducts()` → DOM.
## Теория

### Что такое DOM

DOM — объектная модель документа. Браузер превращает HTML в дерево объектов, к которым JS может обращаться: находить, изменять, добавлять, удалять, вешать обработчики.

### Поиск элементов

```javascript
const container = document.querySelector('[data-products-container]');
const search    = document.querySelector('#catalog-search');
```

Рекомендуется `querySelector` — работает с CSS-селекторами; `data-*`-атрибуты надёжнее CSS-классов как точек подключения JS.

### Безопасный вывод текста

```javascript
el.textContent = userInput;   // ✅ безопасно
el.innerHTML = userInput;     // ❌ уязвимость XSS
```

`textContent` выводит строку как текст; `innerHTML` парсит как HTML — опасен с пользовательскими данными.

### Создание элементов

```javascript
const card = document.createElement('article');
card.classList.add('product-card');
card.textContent = product.title;
container.append(card);
```

### classList

```javascript
el.classList.add('is-active');
el.classList.remove('is-hidden');
el.classList.toggle('is-open');
```

### Атрибуты data-*

```html
<button data-action="add-to-cart" data-product-id="3">В корзину</button>
```
```javascript
const id = Number(button.dataset.productId);
```

### События

| Событие  | Когда происходит            |
|----------|-----------------------------|
| `click`  | пользователь нажал кнопку   |
| `input`  | пользователь вводит текст   |
| `change` | изменилось значение `select`|
| `submit` | пользователь отправил форму |

```javascript
search.addEventListener('input', (e) => {
  catalogState.query = e.target.value;
  updateCatalog();
});
```

### Почему не `onclick` в HTML

```html
<!-- ❌ -->
<button onclick="addToCart(1)">В корзину</button>

<!-- ✅ -->
<button data-action="add-to-cart" data-product-id="1">В корзину</button>
```

HTML — структура, JS — поведение. `addEventListener` проще поддерживать и работает с динамическими элементами.

### Делегирование событий

Один обработчик на контейнере вместо каждого элемента:

```javascript
container.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="add-to-cart"]');
  if (!btn) return;
  const id = Number(btn.dataset.productId);
  // обработка клика
});
```

### Состояние интерфейса

```javascript
const catalogState = { query: '', category: 'all', sort: 'default' };
```

При изменении поиска/фильтра/сортировки обновляем `catalogState` и вызываем `renderProducts()`.
### Рендер

1. Очистить контейнер → подготовить данные → создать карточки → добавить в DOM → показать количество / пустое состояние.

### Базовая валидация формы

```javascript
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  // форма валидна
});
```

Проверка: пустые поля, e-mail, телефон. Ошибки — через `textContent` на страницу.

### Отладка

- **Console** — `console.log()`, `console.table()`, сообщения об ошибках.
- **Breakpoints** (Sources) — остановка на строке, просмотр переменных.
## Ключевые паттерны

### renderProducts()

```javascript
function renderProducts(productsToRender) {
  productsContainer.textContent = '';
  catalogCount.textContent = `Найдено: ${productsToRender.length}`;
  catalogEmpty.hidden = productsToRender.length > 0;
  productsToRender.forEach(p => productsContainer.append(createProductCard(p)));
}
```

### Обработчики поиска, фильтра, сортировки

```javascript
search.addEventListener('input', e => { catalogState.query = e.target.value; updateCatalog(); });
category.addEventListener('change', e => { catalogState.category = e.target.value; updateCatalog(); });
sort.addEventListener('change', e => { catalogState.sort = e.target.value; updateCatalog(); });
```

### Валидация формы

```javascript
function validateEmail() {
  const v = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    showError(emailInput, emailError, 'Введите корректный e-mail.');
    return false;
  }
  clearError(emailInput, emailError);
  return true;
}
```
## Необходимые HTML-элементы

- Поле поиска: `#catalog-search`
- Фильтр категории: `#category-filter`
- Сортировка: `#sort-select`
- Контейнер карточек: `[data-products-container]`
- Счётчик товаров: `.catalog-count`
- Пустое состояние: `.catalog-empty`
## Требования к выполнению (1–14)

1. Создать ветку `feature/dom-events`.
2. Создать `js/catalog.js` и `js/validation.js`.
3. Подключить новые файлы к HTML-страницам.
4. Добавить на каталог: поиск, фильтр категории, сортировку, контейнер карточек, счётчик, сообщение о пустом результате.
5. Выводить карточки через `createElement()`.
6. Реализовать поиск по названию.
7. Реализовать фильтрацию по категории.
8. Реализовать сортировку по цене или названию.
9. Повторный рендер при изменении поиска/фильтра/сортировки.
10. Базовая валидация формы заявки.
11. Ошибки формы — на страницу через `textContent`.
12. Проверка через Console и Breakpoints.
13. Обновить `README.md`.
14. Зафиксировать в Git.
