//Импорт css
import './../pages/index.css';

//Импорт массива
import { initialCards } from '../scripts/constants.js';
import { config } from '../scripts/config.js';

//Импорт классов
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js';


//Импорт DOM узлов
import { popupElementProfile, popupOpenButtonElementProfile, formElementProfile, nameInput, jobInput, popupElementAddPlace, popupOpenButtonElementAddPlace, popupElementImage, profileImageElement} from '../scripts/components.js';

//Api
// Создаём экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'cb509dca-886f-481d-bcb8-759a1762ab1b',
    'Content-Type': 'application/json'
  }
});

// Создаём Promise.all для загрузки информации о пользователе и массива карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData); // С помощью публичного метода setUserInfo класса UserInfo принимаем новые данные
    // пользователя и добавляем их на страницу.
    cardList.renderItems(cards); // С помощью публичного метода renderItems класса Section добавляем готовые
    // DOM-элементы всех карточек в контейнер
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


//Создание карточек Section

//Userinfo
//Создание попапа 1(имя, профессии)
const userInfo = new UserInfo({ nameSelector: '.profile__title', infoSelector: '.profile__profession', avatarSelector: '.profile__avatar' });

//Редактирование имени и информации о себе попап 1
const handleProfileFormSubmit = (formValues) => {
  popupProfile.renderLoading(true);
  popupProfile.disableSubmitButton();
  api.editProfile(formValues)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupProfile.renderLoading(true, 'Сохранено!');
      setTimeout(() => popupProfile.close(), 1000);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку
      popupProfile.renderLoading(true, 'Ошибка запроса!');
    })
    .finally(() => {
      setTimeout(() => {
        popupProfile.enableSubmitButton();
        popupProfile.renderLoading(false);
      },
        1500);
    });
};

//PopupWithForm
//Функция для попапа 1 (имя, профессии)
  const popupProfile =  new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
  popupProfile.setEventListeners();

  const handleCardFormSubmit = (formValues) => {
    popupCard.renderLoading(true);
    popupCard.disableSubmitButton();
    api.addNewCard(formValues)
      .then((cardData) => {
        popupCard.renderLoading(true, 'Создано!');
        cardList.addItem(cardData);
        setTimeout(() => popupCard.close(), 1000);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку
        popupCard.renderLoading(true, 'Ошибка запроса!');
      })
      .finally(() => {
        setTimeout(() => {
          popupCard.enableSubmitButton();
          popupCard.renderLoading(false);
        },
          1500)
      });
  };

  const popupCard = new PopupWithForm('.popup_type_add-place', handleCardFormSubmit);
popupCard.setEventListeners();

//PopupWithImage
// Попап 3 (открытие картинок с текстом)
const popupImage = new PopupWithImage('.popup_type_place-image');
popupImage.setEventListeners();

//Попап просмотра аватара
const popupViewAvatar = new PopupWithImage('.popup_type_view-avatar');
popupViewAvatar.setEventListeners();

  //Функция открытия попапа 3
function handleCardClick(title, image) {
  popupImage.open(title, image);
  };


//PopupWithConfirmation для попапа удаления карточки
// Создаём функцию сабмита попапа для удаления карточки
const handleDeleteCardFormSubmit = (card) => {
  popupDeleteCard.renderLoading(true);
  popupDeleteCard.disableSubmitButton();
  api.deleteCard(card._id)
    .then(() => {
      popupDeleteCard.renderLoading(true, 'Удалено!');
      card.handleDeleteButtonClick();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку
    })
    .finally(() => {
      setTimeout(() => {
        popupDeleteCard.enableSubmitButton();
        popupDeleteCard.renderLoading(false);
      },
        1000)
    });
};

const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete-card', handleDeleteCardFormSubmit);
popupDeleteCard.setEventListeners();

//Создаем функцию сабмита попапа для обновления аватара пользователя

const handleNewAvatarFormSubmit = (formValues) => {
  popupNewAvatar.renderLoading(true);
  popupNewAvatar.disableSubmitButton();
  api.addNewAvatar(formValues)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupNewAvatar.renderLoading(true, 'Сохранено!');
      setTimeout(() => popupNewAvatar.close(), 1000);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку
      popupNewAvatar.renderLoading(true, 'Ошибка запроса!');
    })
    .finally(() => {
      setTimeout(() => {
        popupNewAvatar.enableSubmitButton();
        popupNewAvatar.renderLoading(false);
      },
        1000)
    });
};

//Попап для обновления аватара пользователя
const popupNewAvatar = new PopupWithForm('.popup_type_new-avatar', handleNewAvatarFormSubmit);
popupNewAvatar.setEventListeners();

//Функцию для постановки/снятия лайка
const handleLikeClick = (cardId, card) => {
  const method = card.isLiked() ? 'DELETE' : 'PUT'
  api.setLike(cardId, method)
    .then((res) => {
      card.handleLikeButtonClick();
      card.setLikesValue(res.likes);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
};

const cardList = new Section({
  renderer: (item) => {
    const card = new Card(item, '#templateCards', handleCardClick, handleDeleteClick, handleLikeClick, userInfo.getId());
    const cardElement = card.generateCard();
    return cardElement;
  }
},
  '.cards'
);

// Создаём функцию открытия попапа удаления карточки по клике на кнопку удаления карточки
function handleDeleteClick(card) {
  popupDeleteCard.open(card);
};

//Валидация
//Запускаем валидацию на форму из попапа профиля (используются данные из файла FormValidator.js)
const popupProfileFormValidator = new FormValidator(config, popupElementProfile);
popupProfileFormValidator.enableValidation();


//Слушатели
//Открытие попапа 1 (имя и профессия)
popupOpenButtonElementProfile.addEventListener('click', function () {
  popupProfile.setInputValues(userInfo.getUserInfo());
  formValidators['profile-popupform'].resetValidation()
  popupProfile.open();
});

//Открытие попапа 2(добавление карточек)
popupOpenButtonElementAddPlace.addEventListener('click', function () {
  popupCard.open();
  popupCardFormValidator.disableSubmitButton(); //тут по-другому
});

//Попап обновления аватара
profileImageElement.addEventListener('click', function () {
  formValidators['new-avatar-popupform'].resetValidation()
  popupNewAvatar.open();
});

//Запускаем валидацию на форму из попапа добавления карточки
const popupCardFormValidator = new FormValidator(config, popupElementAddPlace);
popupCardFormValidator.enableValidation();
