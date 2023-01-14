/*
//ВАЛИДАЦИЯ
//2. Валидация на input серез браузерные св-ва
//Создаем функцию проверки инпута
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  if(input.validity.valid) {
  //убрать ошибку
    error.textContent = '';
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
  //показать ошибку
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }
}

//Создаем функцию задизейблить или раздизейблить кнопку
const toogleButton = (inputs, button, config) => {
  const isFormValid = inputs.every(input => input.validity.valid);

  if(isFormValid) {
    //раздизейбить кнопку
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = '';
  } else {
    //задизейбить кнопку
    button.classList.add(config.inactiveButtonClass);
    button.disabled = 'disabled';
  }
}

// Создаем функцию enableValidation

const enableValidation = (config) => {
//Вынимаем из config св-ва, которые нам понадобятся
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config;

  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    })

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, restConfig); //вызываем функцию валидности инпута
        toogleButton(inputs, button, restConfig); //вызываем функцию задизайбить или раздизейбить кнопку
      })
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})
*/
