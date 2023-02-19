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
              this._toggleButtonState();
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
  _toggleButtonState() {
      // Если есть хотя бы один невалидный инпут
      if (this._hasInvalidInput(this._inputList)) {
          // сделай кнопку неактивной
          this._submitButton.classList.add(this._inactiveButtonClass);
          this._submitButton.disabled = true;
          this.disableSubmitButton(this._submitButton);
      } else {
          // иначе сделай кнопку активной
          this._submitButton.classList.remove(this._inactiveButtonClass);
          this._submitButton.disabled = false;
          this.enableSubmitButton(this._submitButton);
      }
  };

  // Функция диактивации кнопки для попап 2
  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
    //buttonElement.classList.add(this._inactiveButtonClass);
    //buttonElement.disabled = true;
  }
//}
};
