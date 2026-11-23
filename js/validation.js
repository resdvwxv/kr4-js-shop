function showError(input, message) {
  // Удаляем старую ошибку
  clearError(input);

  // Помечаем поле как невалидное
  input.setAttribute('aria-invalid', 'true');

  // Создаём элемент ошибки
  const errorEl = document.createElement('small');
  errorEl.classList.add('form-error');
  errorEl.textContent = message;

  // Вставляем после поля
  input.parentNode.appendChild(errorEl);
}

function clearError(input) {
  input.removeAttribute('aria-invalid');
  const existingError = input.parentNode.querySelector('.form-error');
  if (existingError) {
    existingError.remove();
  }
}

function clearAllErrors(form) {
  form.querySelectorAll('.form-error').forEach((el) => el.remove());
  form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
}

// ===============================
// Валидация отдельных полей
// ===============================

function validateRequired(input, fieldName) {
  const value = input.value.trim();
  if (value === '') {
    showError(input, `Поле «${fieldName}» обязательно для заполнения.`);
    return false;
  }
  clearError(input);
  return true;
}

function validateEmail(input) {
  const value = input.value.trim();
  if (value === '') {
    showError(input, 'Введите e-mail.');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    showError(input, 'Введите корректный e-mail (например: name@mail.ru).');
    return false;
  }
  clearError(input);
  return true;
}

function validatePhone(input) {
  const value = input.value.trim();
  if (value === '') {
    showError(input, 'Введите телефон.');
    return false;
  }
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,20}$/;
  if (!phoneRegex.test(value)) {
    showError(input, 'Некорректный формат телефона.');
    return false;
  }
  clearError(input);
  return true;
}

function validateCheckbox(input, fieldName) {
  if (!input.checked) {
    showError(input, `Необходимо согласие на «${fieldName}». `);
    return false;
  }
  clearError(input);
  return true;
}

// ===============================
// Валидация формы в модальном окне (dialog)
// ===============================

function initModalFormValidation() {
  const orderDialog = document.getElementById('order-dialog');
  const orderForm = document.getElementById('order-form');

  if (!orderForm || !orderDialog) return;

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(orderForm);

    const nameInput = orderForm.elements.name;
    const emailInput = orderForm.elements.email;
    const phoneInput = orderForm.elements.phone;
    const agreementInput = orderForm.elements.agreement;

    let isValid = true;

    if (!validateRequired(nameInput, 'Имя')) isValid = false;
    if (!validateEmail(emailInput)) isValid = false;
    if (!validatePhone(phoneInput)) isValid = false;
    if (!validateCheckbox(agreementInput, 'обработку данных')) isValid = false;

    if (!isValid) return;

    // Успешная отправка
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
      successMessage.textContent = 'Заявка успешно отправлена!';
      successMessage.hidden = false;
      setTimeout(() => {
        successMessage.hidden = true;
      }, 5000);
    }

    orderForm.reset();
    orderDialog.close();
  });
}

// ===============================
// Валидация формы на странице order.html
// ===============================

function initOrderPageValidation() {
  const orderFormPage = document.getElementById('order-form-page');
  const successMessagePage = document.getElementById('success-message-page');

  if (!orderFormPage) return;

  orderFormPage.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(orderFormPage);

    const nameInput = orderFormPage.elements.name;
    const emailInput = orderFormPage.elements.email;
    const phoneInput = orderFormPage.elements.phone;
    const agreementInput = orderFormPage.elements.agreement;

    let isValid = true;

    if (!validateRequired(nameInput, 'Имя')) isValid = false;
    if (!validateEmail(emailInput)) isValid = false;
    if (!validatePhone(phoneInput)) isValid = false;
    if (!validateCheckbox(agreementInput, 'обработку данных')) isValid = false;

    if (!isValid) return;

    if (successMessagePage) {
      successMessagePage.textContent = 'Заявка успешно отправлена!';
      successMessagePage.hidden = false;
      setTimeout(() => {
        successMessagePage.hidden = true;
      }, 5000);
    }

    orderFormPage.reset();
  });
}

// ===============================
// Валидация формы на странице contacts.html
// ===============================

function initContactFormValidation() {
  const feedbackForm = document.getElementById('feedback-form');
  const successMessageFeedback = document.getElementById('success-message-feedback');

  if (!feedbackForm) return;

  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors(feedbackForm);

    const nameInput = feedbackForm.elements.name;
    const emailInput = feedbackForm.elements.email;
    const messageInput = feedbackForm.elements.message;

    let isValid = true;

    if (!validateRequired(nameInput, 'Имя')) isValid = false;
    if (!validateEmail(emailInput)) isValid = false;
    if (!validateRequired(messageInput, 'Сообщение')) isValid = false;

    if (!isValid) return;

    if (successMessageFeedback) {
      successMessageFeedback.textContent = 'Сообщение успешно отправлено!';
      successMessageFeedback.hidden = false;
      setTimeout(() => {
        successMessageFeedback.hidden = true;
      }, 5000);
    }

    feedbackForm.reset();
  });
}

// ===============================
// Инициализация
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  initModalFormValidation();
  initOrderPageValidation();
  initContactFormValidation();
});
