//Импорт массива
import { initialCards } from './constants.js';
import { config } from './config.js';

//Импорт классов
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// DOM узел попап 1
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupCloseButtonElementProfile = popupElementProfile.querySelector('.popup__close-btn');
const popupOpenButtonElementProfile = document.querySelector('.profile__edit-button');
const formElementProfile = document.querySelector('.popup__form');
const nameInput = formElementProfile.querySelector('.popup__input_type_surname');
const jobInput = formElementProfile.querySelector('.popup__input_type_profession');
const profileTitle = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__profession');

// DOM узел попап 2
const popupElementAddPlace = document.querySelector('.popup_type_add-place');
const popupCloseButtonElementAddPlace = popupElementAddPlace.querySelector('.popup__close-btn');
const popupOpenButtonElementAddPlace = document.querySelector('.profile__add-button');
const formElementAddPlace = popupElementAddPlace.querySelector('.popup__form');
const pictureInput = document.querySelector('.popup__input_type_place-name');
const linkInput = document.querySelector('.popup__input_type_link');
const cardFormSubmitButton = document.querySelector('.popup__button_invalid');

//DOM узел попап 3
const popupElementImage = document.querySelector('.popup_type_place-image');
const popupImageElementImage = popupElementImage.querySelector('.popup__image');
const popupCloseButtonElementImage = popupElementImage.querySelector('.popup__close-btn');
const popupTitleElementImage = popupElementImage.querySelector('.popup__image-title');

//DOM узел контейнера для карточек
const cardContainer = document.querySelector(".cards");

// Функция для открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keyup', handleKeyUp);
  document.addEventListener('click', handleOverleyClick);
}

//Функция для закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleKeyUp);
  document.removeEventListener('click', handleOverleyClick);
}

//Функция для закрытия по Ecs
const handleKeyUp = (e) => {
  if(e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

//Функция для закрытия по Overley
const handleOverleyClick = (event) => {
  if(event.target.closest('.popup')) {
    closePopup(event.target);
  }
}

// Кнопка открытия попапа 1
popupOpenButtonElementProfile.addEventListener('click', function () {
  openPopup(popupElementProfile);
  nameInput.value = profileTitle.textContent; // Берет значение имени из section:profile
  jobInput.value = profileProfession.textContent; // Берет значение профессии из section:profile
});

// Кнопка открытия попапа 2
popupOpenButtonElementAddPlace.addEventListener('click', function () {
  openPopup(popupElementAddPlace);
  disableSubmitButton(cardFormSubmitButton);
});

// Кнопка закрытия попапа 1
popupCloseButtonElementProfile.addEventListener('click', function () {
  closePopup(popupElementProfile);
});

// Кнопка закрытия попапа 2
popupCloseButtonElementAddPlace.addEventListener('click', function () {
  closePopup(popupElementAddPlace);
});

// Кнопка закрытия попапа 3
popupCloseButtonElementImage.addEventListener('click', function () {
  closePopup(popupElementImage);
});

//Редактирование имени и информации о себе попап 1
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value; // Применяем к фамилии в профиле значение введенное в форме попап 1
  profileProfession.textContent = jobInput.value; // Применяем к профессии в профиле значение введенное в форме попап 1
  closePopup(popupElementProfile); //Автоматическое закрытие попап 1
}

// Кнопка отправки формы попап 1
formElementProfile.addEventListener('submit', handleProfileFormSubmit);

// Загрузка и генерация стандартных карточек страницы
initialCards.forEach((data) => {
  const card = new Card(data, '#templateCards', handleCardClick);
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
});

function createCard(data) {
  const card = new Card(data, '#templateCards', handleCardClick);
  return card.generateCard();
}

//Создадим функцию для открытия новой карточки
const renderCard = (data, item) => {
  createCard(data);
  item.prepend(createCard(data));
};

//Функция открытия попапа 3(используется в файле card.js)
function handleCardClick(title, image) {
  popupImageElementImage.src = image;
  popupImageElementImage.alt = title;
  popupTitleElementImage.textContent = title;
  openPopup(popupElementImage);
}

//Запускаем валидацию на форму из попапа профиля (используются данные из файла FormValidator.js)
const popupProfileFormValidator = new FormValidator(config, popupElementProfile);
popupProfileFormValidator.enableValidation();

//Запускаем валидацию на форму из попапа добавления карточки
const popupCardFormValidator = new FormValidator(config, popupElementAddPlace);
popupCardFormValidator.enableValidation();

// Обработчики событий для добавления карточки

const handleSubmitAddCard = (e) => {
  e.preventDefault();
  const elementCard = {
    title: pictureInput.value,
    image: linkInput.value
  }
  renderCard(elementCard, cardContainer)
  formElementAddPlace.reset(); // делает значения формы пустыми
  closePopup(popupElementAddPlace);
};

//Добавление новой карточки попап 2
formElementAddPlace.addEventListener('submit', handleSubmitAddCard);

