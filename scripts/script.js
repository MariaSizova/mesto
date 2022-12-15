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

//Закрытие попапа по Ecs
const handleKeyUp = (e) => {
  if(e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

//Закрытие попапа по Overley
const handleOverleyClick = (event) => {
  if(event.target.closest('.popup')) {
    closePopup(event.target);
  }
}

//Функция для попапа 2 - неактивная кнопка
function disableSubmitButton() {
  cardFormSubmitButton.classList.add('popup__button_invalid');
  cardFormSubmitButton.disabled = true;
}

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
function handleProfileFormSubmit() {
  profileTitle.textContent = nameInput.value; // Применяем к фамилии в профиле значение введенное в форме попап 1
  profileProfession.textContent = jobInput.value; // Применяем к профессии в профиле значение введенное в форме попап 1
  closePopup(popupElementProfile); //Автоматическое закрытие попап 1
}

// Кнопка отправки формы попап 1
formElementProfile.addEventListener('submit', handleProfileFormSubmit);

// Дом узлы

const cardContainer = document.querySelector(".cards");

// Шаблоны

const cardTemplate = document.querySelector('#templateCards').content.querySelector('.cards__item');

// Генерация карточки (+ добавить функции для удаления и добавления)

const handleLikeButton = (event) => {
  event.target.closest('.cards__like-btn').classList.toggle('cards__like-btn_active'); // Добавляет или удаляет класс cards__like-btn_active
}

const handleDeleteCard = (event) => {
  event.target.closest('.cards__item').remove(); //Находим карточку, на которую нажали удалить
}

const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true); // Создаем новую переменную, клонируя тег li .cards__item

  const name = newCard.querySelector('.cards__title');
  name.textContent = dataCard.name; // Присваиваем значение name из массива к новой карточке

  const image = newCard.querySelector('.cards__image');
  image.setAttribute('src', dataCard.link); // Присваиваем значение link из массива к новой карточке
  image.setAttribute('alt', dataCard.name); // Присваиваем значение в alt картинки

  const likeButton = newCard.querySelector('.cards__like-btn');
  likeButton.addEventListener('click', handleLikeButton);

  const buttonDeleteCard = newCard.querySelector('.cards__remove-btn');
  buttonDeleteCard.addEventListener('click', handleDeleteCard);

  const popupOpenButtonImage = newCard.querySelector('.cards__image');
  const handlePopupImage = () => {
    popupImageElementImage.src = dataCard.link;
    popupImageElementImage.alt = dataCard.name;
    popupTitleElementImage.textContent = dataCard.name;
    openPopup(popupElementImage);
  }
  popupOpenButtonImage.addEventListener('click', handlePopupImage);

  return newCard; //возвращаем карточки
}

// Обработчики событий
const handleSubmitAddCard = () => {
  renderCard({ name: pictureInput.value, link: linkInput.value }); // вызывает функцию добавление карточки и передает значение из input
  formElementAddPlace.reset(); // делает значения формы пустыми
  closePopup(popupElementAddPlace);
};

//Добавление карточки
const renderCard = (dataCard) => {
  cardContainer.prepend(generateCard(dataCard));
};

//Рендер карточек
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});

// Добавление новой карточки попап 2
formElementAddPlace.addEventListener('submit', handleSubmitAddCard);
