//Импорт css
import './../pages/index.css';

//Импорт массива
import { initialCards } from '../scripts/constants.js';
//import { config } from './config.js';
import { config } from '../scripts/config.js';

//Импорт классов
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

//Импорт DOM узлов
import { popupElementProfile, popupOpenButtonElementProfile, formElementProfile, nameInput, jobInput, popupElementAddPlace, popupOpenButtonElementAddPlace, popupElementImage} from '../scripts/components.js';

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

const handleCardFormSubmit = (formValues) => {
  const cardItem = {
    title: formValues.place,
    image: formValues.url
  }

  const newCard = createCard(cardItem);
  cardList.addItem(newCard);
  popupCard.close();
}

  const popupCard = new PopupWithForm('.popup_type_add-place', handleCardFormSubmit);
popupCard.setEventListeners();

function createCard(item) {
  const card = new Card(item, '#templateCards', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
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
