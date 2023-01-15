export class Card {
  constructor(data, templateSelector, handleCardClick) {
  this._title = data.title; // свойство Заголовок карточки
  this._image = data.image; // свойство url изображения
  this._templateSelector = templateSelector; // свойство #templateCards
  this._handleCardClick = handleCardClick; // метод - функция открытия попап 3
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.cards__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    //this._popupElementImage = this._element.querySelector('.popup_type_place-image');
    this._setEventListeners(); // добавим обработчики
    this._elementChangeData();

    // Вернём элемент наружу
    return this._element;
  }

  _elementChangeData() {
    this._element.querySelector('.cards__image').src = this._image;
    this._element.querySelector('.cards__title').textContent = this._title;
    this._element.querySelector('.cards__image').alt = this._title;
  }

//Обработчики событий
  _setEventListeners() {
    this._element.querySelector('.cards__like-btn').addEventListener('click', (event) => {
      this._handleLikeButton(event);
    });

    this._element.querySelector('.cards__remove-btn').addEventListener('click', (event) => {
      this._handleDeleteCard(event);
    });

    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  }

  _handleLikeButton(event) {
    event.target.classList.toggle('cards__like-btn_active');
  }

  _handleDeleteCard(event) {
    this._element.remove(event);
  }
}
