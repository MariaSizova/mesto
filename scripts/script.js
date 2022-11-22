// попап

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_surname');
const jobInput = formElement.querySelector('.popup__input_type_profession');
const saveButton = formElement.querySelector('.popup__save-btn');
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
}

popupCloseButtonElement.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);


