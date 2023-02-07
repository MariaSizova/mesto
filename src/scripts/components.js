// DOM узел попап 1
export const popupElementProfile = document.querySelector('.popup_type_profile');
const popupCloseButtonElementProfile = popupElementProfile.querySelector('.popup__close-btn');
export const popupOpenButtonElementProfile = document.querySelector('.profile__edit-button');
export const formElementProfile = document.querySelector('.popup__form');
//const nameInput = formElementProfile.querySelector('.popup__input_type_surname');
//const jobInput = formElementProfile.querySelector('.popup__input_type_profession');
export const nameInput = formElementProfile.querySelector('input[name="name"]');
export const jobInput = formElementProfile.querySelector('input[name="job"]');
const profileTitle = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__profession');

// DOM узел попап 2
export const popupElementAddPlace = document.querySelector('.popup_type_add-place');
const popupCloseButtonElementAddPlace = popupElementAddPlace.querySelector('.popup__close-btn');
export const popupOpenButtonElementAddPlace = document.querySelector('.profile__add-button');
const formElementAddPlace = popupElementAddPlace.querySelector('.popup__form');
const pictureInput = document.querySelector('.popup__input_type_place-name');
const linkInput = document.querySelector('.popup__input_type_link');
const cardFormSubmitButton = document.querySelector('.popup__button_invalid');

//DOM узел попап 3
export const popupElementImage = document.querySelector('.popup_type_place-image');
const popupImageElementImage = popupElementImage.querySelector('.popup__image');
const popupCloseButtonElementImage = popupElementImage.querySelector('.popup__close-btn');
const popupTitleElementImage = popupElementImage.querySelector('.popup__image-title');

//DOM узел контейнера для карточек
const cardContainer = document.querySelector(".cards");
