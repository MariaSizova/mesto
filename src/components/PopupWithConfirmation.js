import { Popup } from "../components/Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__save-btn');
        this._submitButtonText = this._submitButton.textContent;// текст кнопки в конструкторе
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();

            // добавим вызов функции _handleFormSubmit
            this._handleFormSubmit(this._card);
        });
    }

    open(card) {
        this._card = card;
        super.open();
    }

    disableSubmitButton() {
        this._submitButton.disabled = true;
    }

    enableSubmitButton() {
        this._submitButton.disabled = false;
    }

    renderLoading(isLoading, loadingText = 'Удаление...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }
}
