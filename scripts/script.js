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

//Закрытие попапа по Ecs
const handleKeyUp = (e) => {
  if(e.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    closePopup(openPopup);
}
}

//Закрытие попапа по Overley
const handleOverley = (event) => {
  if(event.target.closest('.popup')) {
    closePopup(event.target);
  }
}

// Функция для открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keyup', handleKeyUp);
  document.addEventListener('click', handleOverley);
}

//Функция для закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keyup', handleKeyUp);
  document.removeEventListener('click', handleOverley);
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
function submitEditProfileForm(evt) {
  evt.preventDefault(); // Отменить действие браузера по умолчанию после наступления события
  profileTitle.textContent = nameInput.value; // Применяем к фамилии в профиле значение введенное в форме попап 1
  profileProfession.textContent = jobInput.value; // Применяем к профессии в профиле значение введенное в форме попап 1
  closePopup(popupElementProfile); //Автоматическое закрытие попап 1
}

// Кнопка отправки формы попап 1
formElementProfile.addEventListener('submit', submitEditProfileForm);

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
const handleSubmitAddCard = (event) => {
  event.preventDefault(); //Отменить действие браузера по умолчанию после наступления события
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


//ВАЛИДАЦИЯ
//2. Валидация на input серез браузерные св-ва
//ДOM узлы
const forms = [...document.querySelectorAll('.popup__form')];
const inputs = [...document.querySelectorAll('.popup__input')];

//Создаем функцию проверки инпута
const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`)

if(input.validity.valid) {
  //убрать ошибку
  error.textContent = ''
  error.classList.remove(config.errorClass) //ПОСМОТРЕТЬ!!!
  input.classList.remove(config.inputErrorClass)
} else {
  //показать ошибку
  error.textContent = input.validationMessage
  error.classList.add(config.errorClass) //ПОСМОТРЕТЬ!!
  input.classList.add(config.inputErrorClass)
}
}

//Создаем функцию задизейблить или раздизейблить кнопку
const toogleButton = (inputs, button, config) => {
  const isFormValid = inputs.every(input => input.validity.valid)

  if(isFormValid) {
    //раздизейбить кнопку
    button.classList.remove(config.inactiveButtonClass)
    button.disabled = ''
  } else {
    //задизейбить кнопку
    button.classList.add(config.inactiveButtonClass)
    button.disabled = 'disabled'
  }
}

// Создаем функцию enableValidation

const enableValidation = (config) => {
//Вынимаем из config св-ва, которые нам понадобятся
  const { formSelector, inputSelector, submitButtonSelector, ...restConfig } = config

  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    form.addEventListener('sibmit', (e) => {
      e.preventDefault()
    })

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, restConfig) //вызываем функцию валидности инпута
        toogleButton(inputs, button, restConfig) //вызываем функцию задизайбить или раздизейбить кнопку
      })
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})
