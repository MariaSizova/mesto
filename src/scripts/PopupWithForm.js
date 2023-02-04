//import { Popup } from "./Popup.js";
import { Popup } from "../scripts/Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form'); // находим элементы формы для того, чтобы в методе close сбросить все инпуты формы (сбросить форму)
        this._inputList = this._popupElement.querySelectorAll('.popup__input'); // находим все элементы полей
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
}
