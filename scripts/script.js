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

//DOM узел попап 3
const popupElementImage = document.querySelector('.popup_type_place-image');
const popupImageElementImage = popupElementImage.querySelector('.popup__image');
const popupCloseButtonElementImage = popupElementImage.querySelector('.popup__close-btn');
const popupTitleElementImage = popupElementImage.querySelector('.popup__image-title');

// Функция открытие попап 1
const openPopupProfile = () => {
  popupElementProfile.classList.add('popup_is-opened'); // Добавлет класс для отображения попап
  nameInput.value = profileTitle.textContent; // Берет значение имени из section:profile
  jobInput.value = profileProfession.textContent; // Берет значение профессии из section:profile
}

// Функция открытия попап 2
const openPopupAddPlace = () => {
  popupElementAddPlace.classList.add('popup_is-opened'); // Добавлет класс для отображения попап
}

// Функция открытия попап 3
const openPopupImage = () => {
  popupElementImage.classList.add('popup_is-opened'); // Добавлет класс для отображения попап
}

// Функция закрытия попап 1
const closePopupProfile = () => {
  popupElementProfile.classList.remove('popup_is-opened'); // Удаляет класс для отображения попап
}

// Функция закрытия попап 2
const closePopupAddPlace = () => {
  popupElementAddPlace.classList.remove('popup_is-opened'); // Удаляет класс для отображения попап
}

// Функция закрытия попап 3
const closePopupImage = () => {
  popupElementImage.classList.remove('popup_is-opened'); // Удаляет класс для отображения попап
}

// Кнопка открытия попап 1
popupOpenButtonElementProfile.addEventListener('click', openPopupProfile); // По клику на кнопку запускает функцию открытия попап 1

// Кнопка открытия попап 2
popupOpenButtonElementAddPlace.addEventListener('click', openPopupAddPlace); // По клику на кнопку запускает функцию открытия попап 2

// Кнопка закрытия попап 1
popupCloseButtonElementProfile.addEventListener('click', closePopupProfile); // По клику на кнопку запускает функцию закрытия попап 1

// Кнопка закрытия попап 2
popupCloseButtonElementAddPlace.addEventListener('click', closePopupAddPlace); // По клику на кнопку запускает функцию закрытия попап 2

// Кнопка закрытия попап 3
popupCloseButtonElementImage.addEventListener('click', closePopupImage); // По клику на кнопку запускает функцию закрытия попап 3

//Редактирование имени и информации о себе попап 1
function formSubmitHandler(evt) {
  evt.preventDefault(); // Отменить действие браузера по умолчанию после наступления события
  profileTitle.textContent = nameInput.value; // Применяем к фамилии в профиле значение введенное в форме попап 1
  profileProfession.textContent = jobInput.value; // Применяем к профессии в профиле значение введенное в форме попап 1
  closePopupProfile(); //Автоматическое закрытие попап 1
}

// Кнопка отправки формы попап 1
formElementProfile.addEventListener('submit', formSubmitHandler);


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

  const link = newCard.querySelector('.cards__image');
  link.setAttribute('src', dataCard.link); // Присваиваем значение link из массива к новой карточке
  link.setAttribute('alt', dataCard.name); // Присваиваем значение в alt картинки

  const likeButton = newCard.querySelector('.cards__like-btn');
  likeButton.addEventListener('click', handleLikeButton)

  const DeleteButton = newCard.querySelector('.cards__remove-btn');
  DeleteButton.addEventListener('click', handleDeleteCard)

  const popupOpenButtonImage = newCard.querySelector('.cards__image');
  const handlePopupImage = () => {
    popupImageElementImage.src = dataCard.link;
    popupImageElementImage.alt = dataCard.name;
    popupTitleElementImage.textContent = dataCard.name;
    openPopupImage();
  }
  popupOpenButtonImage.addEventListener('click', handlePopupImage);

  return newCard; //возвращаем карточки
}

// Обработчики событий
const handleSubmitAddCard = (event) => {
  event.preventDefault(); //Отменить действие браузера по умолчанию после наступления события
  renderCard({ name: pictureInput.value, link: linkInput.value }); // вызывает функцию добавление карточки и передает значение из input
  pictureInput.value = ''; // делает значение формы name пустым
  linkInput.value = ''; // делает значение формы link пустым
  closePopupAddPlace();
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


