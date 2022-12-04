// попап

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_surname');
const jobInput = formElement.querySelector('.popup__input_type_profession');
const profileTitle = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__profession');

const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileProfession.textContent;
}

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);

//Редактирование имени и информации о себе

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup();
}

popupCloseButtonElement.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);

// Массив карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Дом узлы (+добавить значения для кнопок)

const cardContainer = document.querySelector(".cards");

// Шаблоны

const cardTemplate = document.querySelector('#templateCards').content.querySelector('.cards__item');

// Генерация карточки (+ добавить функции для удаления и добавления)

const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const name = newCard.querySelector('.cards__title');
  name.textContent = dataCard.name;

  const link = newCard.querySelector('.cards__image');
  link.setAttribute('src', dataCard.link);

  return newCard;
}

// Обработчики событий
const handleSubmitAddTodoForm = (event) => {
  event.preventDefault();
  //renderCard({ title: input.value })
  //input.value = '';
};


//Добавление карточки

const renderCard = (dataCard) => {
  cardContainer.prepend(generateCard(dataCard));
};


//Рендер карточек

initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});
