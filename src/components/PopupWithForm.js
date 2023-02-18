import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form'); // находим элементы формы для того, чтобы в методе close сбросить все инпуты формы (сбросить форму)
        this._inputList = this._popupElement.querySelectorAll('.popup__input'); // находим все элементы полей
        this._submitButton = this._form.querySelector('.popup__save-btn');
        this._submitButtonText = this._submitButton.textContent;
    }

//Метод, который собирает данные всех полей формы.

    _getInputValues() {
        // создаём пустой объект и добавляем в этот объект значения всех полей (инпутов), обойдя все поля (инпуты) по свойству (полю) name
        const formValues = {};

        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setInputValues(userData) {
      this._inputList.forEach(input => {
          // присваиваем value инпута данные из объекта по атрибуту name
          input.value = userData[input.name];
      });
  }


// Метод добавления обработчика клика иконке закрытия, и добавления обработчика сабмита формы.

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();

            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    disableSubmitButton() {
      this._submitButton.disabled = true;
  }

  enableSubmitButton() {
      this._submitButton.disabled = false;
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
        this._submitButton.textContent = loadingText;
    } else {
        this._submitButton.textContent = this._submitButtonText;
    }
}
}
