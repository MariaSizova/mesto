export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, userID) {
    this._text = data.title;
    this._link = data.image;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._userID = userID;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._element = this._getTemplate();
    // Запишем изображение из темлейта (шаблона) в переменную, т. к.
    // к нему нужно будет обращаться дважды (задавая атрибуты src и alt).
    this._elementImg = this._element.querySelector('.cards__image');
    this._likeButton = this._element.querySelector('.cards__like-btn');
    this._countOfLikes = this._element.querySelector('.element__count-likes'); //Разобраться
    this._deleteButton = this._element.querySelector('.cards__remove-btn');

    this._setEventListeners();
    this._handleRemoveDeleteButton();
    this._toggleLikeButton();
    this._showCountofLikes();

    //Добавляем данные к карточкам
    this._elementImg.src = this._link;
    this._elementImg.alt = this._text;
    this._element.querySelector('.cards__title').textContent = this._text;

    return this._element;
  }

//Обработчики событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id, this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._text, this._link);
    });
  }

  //_handleLikeClick(event) {
  //  event.target.classList.toggle('cards__like-btn_active');
  //}

  //_handleDeleteClick(event) {
  //  this._element.remove(event);
  //}

  handleLikeButtonClick = () => {
    this._likeButton.classList.toggle('element__like-button_active');//Разобраться
  }

  handleDeleteButtonClick = () => {
    this._element.remove();
    this._element = null;
  }

  _handleRemoveDeleteButton() {
    if (this._ownerId != this._userID) {
      this._deleteButton.classList.add('element__delete-button_hide');//Разобраться
    }
  }
  _showCountofLikes() {
    this._countOfLikes.textContent = this._likes.length;
  }

  _toggleLikeButton = () => {
    if (this.isLiked()) {
      this.handleLikeButtonClick();
    }
  }

  isLiked() {
    const isLikedByMe = this._likes.some(like => like._id === this._userID);
    return isLikedByMe
  }

  setLikesValue(likes) {
    this._likes = likes;
    this._countOfLikes.textContent = likes.length;
  }
}
