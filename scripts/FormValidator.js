export class FormValidator {
  constructor(config, formElement) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  };

  //Показываем ошибки в инпуте (в поле ввода)
  _showInputError(input, errorMessage) {
      const error = this._formElement.querySelector(`#${input.id}-error`);
      input.classList.add(this._inputErrorClass);
      error.textContent = errorMessage;
      error.classList.add(this._errorClass);
  };

  //Создаём функцию скрытия ошибки в инпуте (в поле ввода)
  _hideInputError(input) {
      const error = this._formElement.querySelector(`#${input.id}-error`);
      error.textContent = '';
      input.classList.remove(this._inputErrorClass);
      error.classList.remove(this._errorClass);
  };

  //Проверяем валидность полей ввода
  _checkInputValidity(input) {
      if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
      } else {
          this._hideInputError(input);
      }
  };

  //Вешаем слушатели на все поля
  _setEventListeners() {
      this._inputList.forEach(input => {
          input.addEventListener('input', () => {
              this._checkInputValidity(input);
              this._toggleButtonState(this._inputList, this._submitButton);
          });
      });
  };

  //Создаём функцию запуска валидации
  enableValidation() {
      this._setEventListeners();
  };

  //Проверяем все поля на валидность
  // Функция принимает массив полей
  _hasInvalidInput(inputList) {
      // проходим по массиву методом some
      return inputList.some((inputElement) => {

          return !inputElement.validity.valid;
      })
  };

  //Активируем кнопки: раздизэйблить и задизэйблить
  // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState(inputList, buttonElement) {
      // Если есть хотя бы один невалидный инпут
      if (this._hasInvalidInput(inputList)) {
          // сделай кнопку неактивной
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.disabled = true;
      } else {
          // иначе сделай кнопку активной
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.disabled = false;
      }
  };
};
