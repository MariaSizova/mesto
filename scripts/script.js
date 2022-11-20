// попап

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
}

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

//Редактирование имени и информации о себе

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__surname');
let jobInput = formElement.querySelector('.popup__profession');
let saveButton = formElement.querySelector('.popup__save-btn');
let profileTitle = document.querySelector('.profile__title');
let profileProfession = document.querySelector('.profile__profession');

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = nameInput.value;
  profileTitle.textContent = nameInput.value;
  jobInput.textContent = jobInput.value;
  profileProfession.textContent = jobInput.value;
}

saveButton.addEventListener('click', formSubmitHandler);
formElement.addEventListener('submit', formSubmitHandler);


