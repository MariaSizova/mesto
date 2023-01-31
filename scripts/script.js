//Импорт массива
import { initialCards } from './constants.js';
import { config } from './config.js';

//Импорт классов
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

// DOM узел попап 1
const popupElementProfile = document.querySelector('.popup_type_profile');
const popupCloseButtonElementProfile = popupElementProfile.querySelector('.popup__close-btn');
const popupOpenButtonElementProfile = document.querySelector('.profile__edit-button');
const formElementProfile = document.querySelector('.popup__form');
//const nameInput = formElementProfile.querySelector('.popup__input_type_surname');
//const jobInput = formElementProfile.querySelector('.popup__input_type_profession');
const nameInput = formElementProfile.querySelector('input[name="name"]');
const jobInput = formElementProfile.querySelector('input[name="job"]');
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
//const openPopup = (popup) => {
//  popup.classList.add('popup_is-opened');

//  document.addEventListener('keyup', handleKeyUp);
//  document.addEventListener('click', handleOverleyClick);
//}

//Функция для закрытия попапа
//const closePopup = (popup) => {
//  popup.classList.remove('popup_is-opened');
//  document.removeEventListener('keyup', handleKeyUp);
//  document.removeEventListener('click', handleOverleyClick);
//}

//Функция для закрытия по Ecs
//const handleKeyUp = (e) => {
//  if(e.key === 'Escape') {
//    const openedPopup = document.querySelector('.popup_is-opened');
//    closePopup(openedPopup);
//  }
//}

//Функция для закрытия по Overley
//const handleOverleyClick = (event) => {
//  if(event.target.closest('.popup')) {
//    closePopup(event.target);
//  }
//}

// Кнопка открытия попапа 1
//popupOpenButtonElementProfile.addEventListener('click', function () {
//  openPopup(popupElementProfile);
//  nameInput.value = profileTitle.textContent; // Берет значение имени из section:profile
//  jobInput.value = profileProfession.textContent; // Берет значение профессии из section:profile
//});


//Userinfo
//Создание попапа 1(имя, профессии)
const userInfo = new UserInfo({ nameSelector: '.profile__title', infoSelector: '.profile__profession' });

//Редактирование имени и информации о себе попап 1
function handleProfileFormSubmit(formValues) {
  userInfo.setUserInfo(formValues);
  popupProfile.close();
}

//PopupWithForm
//Функция для попапа 1 (имя, профессии)
  const popupProfile =  new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
  popupProfile.setEventListeners();

//Функция для попапа 3(открытие карточек)

const handleCardFormSubmit = () => {
  const cardItem = {
    title: pictureInput.value,
    image: linkInput.value
  }
  const newCard = createCard(cardItem);
  cardList.addItem(newCard);
  popupCard.close();
}

  const popupCard = new PopupWithForm('.popup_type_add-place', handleCardFormSubmit);
popupCard.setEventListeners();

// Кнопка открытия попапа 2
//popupOpenButtonElementAddPlace.addEventListener('click', function () {
//  openPopup(popupElementAddPlace);
//  popupCardFormValidator.disableSubmitButton();
//});


// Кнопка закрытия попапа 1
//popupCloseButtonElementProfile.addEventListener('click', function () {
//  closePopup(popupElementProfile);
//});

// Кнопка закрытия попапа 2
//popupCloseButtonElementAddPlace.addEventListener('click', function () {
//  closePopup(popupElementAddPlace);
//  formElementAddPlace.reset();
//});

// Кнопка закрытия попапа 3
//popupCloseButtonElementImage.addEventListener('click', function () {
//  closePopup(popupElementImage);
//});

// Кнопка отправки формы попап 1
//formElementProfile.addEventListener('submit', handleProfileFormSubmit);


//SECTION
// Загрузка и генерация стандартных карточек страницы
// Используем класс Section

function createCard(item) {
  const card = new Card(item, '#templateCards', handleCardClick);
  return card.generateCard();
}

const cardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);//Создаем новую карточку
    cardList.addItem(cardElement);
  }
},
  '.cards'
);

cardList.renderItems(initialCards);


//initialCards.forEach((data) => {
//  createCard(data);

//  cardContainer.prepend(createCard(data));
//});

//Создадим функцию для открытия новой карточки
//const renderCard = (data, item) => {
//  createCard(data);
//  item.prepend(createCard(data));
//};

//Функция открытия попапа 3(используется в файле card.js)
//function handleCardClick(title, image) {
//  popupImageElementImage.src = image;
//  popupImageElementImage.alt = title;
//  popupTitleElementImage.textContent = title;
//  openPopup(popupElementImage);
//}


//PopupWithImage
// Попап 3 (открытие картинок с текстом)
const popupImage = new PopupWithImage('.popup_type_place-image');
popupImage.setEventListeners();

  //Функция открытия попапа 3
function handleCardClick(title, image) {
  popupImage.open(title, image);
  };

//Запускаем валидацию на форму из попапа профиля (используются данные из файла FormValidator.js)
const popupProfileFormValidator = new FormValidator(config, popupElementProfile);
popupProfileFormValidator.enableValidation();

// Обработчики событий для добавления карточки

//const handleSubmitAddCard = (e) => {
//  e.preventDefault();
//  const elementCard = {
//    title: pictureInput.value,
//    image: linkInput.value
//  }
//  renderCard(elementCard, cardContainer)
//  formElementAddPlace.reset(); // делает значения формы пустыми
  //closePopup(popupElementAddPlace);
//};

//Добавление новой карточки попап 2
//formElementAddPlace.addEventListener('submit', handleSubmitAddCard);


//Слушатели
//Открытие попапа 1 (имя и профессия)
popupOpenButtonElementProfile.addEventListener('click', function () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
  popupProfile.open();
});

//Открытие попапа 2(добавление карточек)
popupOpenButtonElementAddPlace.addEventListener('click', function () {
  popupCard.open();
  popupCardFormValidator.disableSubmitButton();
});

//Запускаем валидацию на форму из попапа добавления карточки
const popupCardFormValidator = new FormValidator(config, popupElementAddPlace);
popupCardFormValidator.enableValidation();
