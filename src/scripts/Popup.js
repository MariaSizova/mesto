export class Popup {
  constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
  }

//Метод, который отвечает за открытие попапов

  open() {
      this._popupElement.classList.add('popup_is-opened');
      document.addEventListener('keydown', this._handleEscClose);
  }

//Метод, который отвечает за закрытие попапов

  close() {
      this._popupElement.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', this._handleEscClose);
  }

//Метод закрытия попапа клавишей Esc

  _handleEscClose(e) {
      if (e.key === 'Escape') {
          this.close();
        }
  }

//Метод закрытия попапа по оверлей и закрытие попапа по нажатию на кнопку-крестик

  setEventListeners() {
      this._popupElement.querySelector('.popup__close-btn').addEventListener('click', () => {
          this.close();
        });

      this._popupElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup_is-opened')) {
          this.close();
        }
      })
  }
}
