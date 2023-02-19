(()=>{"use strict";const e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-btn",inactiveButtonClass:"popup__button_invalid",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};class t{constructor(e,t,s,n,i,o){this._text=e.name,this._link=e.link,this._ownerId=e.owner._id,this._id=e._id,this._likes=e.likes,this._userID=o,this._templateSelector=t,this._handleCardClick=s,this._handleDeleteClick=n,this._handleLikeClick=i}_getTemplate(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}generateCard(){return this._element=this._getTemplate(),this._elementImg=this._element.querySelector(".element__image"),this._likeButton=this._element.querySelector(".element__like-button"),this._countOfLikes=this._element.querySelector(".element__count-likes"),this._deleteButton=this._element.querySelector(".element__delete-button"),this._setEventListeners(),this._handleRemoveDeleteButton(),this._toggleLikeButton(),this._showCountofLikes(),this._elementImg.src=this._link,this._elementImg.alt=this._text,this._element.querySelector(".element__title").textContent=this._text,this._element}_setEventListeners(){this._likeButton.addEventListener("click",(()=>{this._handleLikeClick(this._id,this)})),this._deleteButton.addEventListener("click",(()=>{this._handleDeleteClick(this)})),this._elementImg.addEventListener("click",(()=>{this._handleCardClick(this._text,this._link)}))}handleLikeButtonClick=()=>{this._likeButton.classList.toggle("element__like-button_active")};handleDeleteButtonClick=()=>{this._element.remove(),this._element=null};_handleRemoveDeleteButton(){this._ownerId!=this._userID&&this._deleteButton.classList.add("element__delete-button_hide")}_showCountofLikes(){this._countOfLikes.textContent=this._likes.length}_toggleLikeButton=()=>{this.isLiked()&&this.handleLikeButtonClick()};isLiked(){return this._likes.some((e=>e._id===this._userID))}setLikesValue(e){this._likes=e,this._countOfLikes.textContent=e.length}}class s{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._submitButton=this._formElement.querySelector(this._submitButtonSelector)}_showInputError(e,t){const s=this._formElement.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),s.textContent=t,s.classList.add(this._errorClass)}_hideInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);t.textContent="",e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_setEventListeners(){this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState(this._inputList,this._submitButton)}))}))}enableValidation(){this._setEventListeners()}_hasInvalidInput(e){return e.some((e=>!e.validity.valid))}_toggleButtonState(e,t){this._hasInvalidInput(this._inputList)?(t.disabled=!0,this.disableSubmitButton(this._submitButton)):(t.classList.remove(this._inactiveButtonClass),t.disabled=!1)}disableSubmitButton(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}}class n{constructor(e){this._popupElement=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popupElement.classList.add("popup_is-opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popupElement.classList.remove("popup_is-opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popupElement.querySelector(".popup__close-btn").addEventListener("click",(()=>{this.close()})),this._popupElement.addEventListener("mousedown",(e=>{e.target.classList.contains("popup_is-opened")&&this.close()}))}}class i extends n{constructor(e){super(e),this._popupImageElementImage=this._popupElement.querySelector(".popup__image"),this._popupTitleElementImage=this._popupElement.querySelector(".popup__image-title")}open(e,t){this._popupImageElementImage.src=t,this._popupImageElementImage.alt=e,this._popupTitleElementImage.textContent=e,super.open()}}class o extends n{constructor(e,t){super(e),this._handleFormSubmit=t,this._form=this._popupElement.querySelector(".popup__form"),this._inputList=this._popupElement.querySelectorAll(".popup__input"),this._submitButton=this._form.querySelector(".popup__save-btn"),this._submitButtonText=this._submitButton.textContent}_getInputValues(){const e={};return this._inputList.forEach((t=>{e[t.name]=t.value})),e}setInputValues(e){this._inputList.forEach((t=>{t.value=e[t.name]}))}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues())}))}close(){super.close(),this._form.reset()}disableSubmitButton(){this._submitButton.disabled=!0}enableSubmitButton(){this._submitButton.disabled=!1}renderLoading(e,t="Сохранение..."){this._submitButton.textContent=e?t:this._submitButtonText}}const r=document.querySelector(".popup_type_profile"),l=(r.querySelector(".popup__close-btn"),document.querySelector(".profile__edit-button")),u=document.querySelector(".popup__form"),a=u.querySelector('input[name="name"]'),_=u.querySelector('input[name="job"]'),d=(document.querySelector(".profile__title"),document.querySelector(".profile__profession"),document.querySelector(".popup_type_add-place")),c=document.querySelector(".popup_type_new-avatar"),p=(d.querySelector(".popup__close-btn"),document.querySelector(".profile__add-button")),h=(d.querySelector(".popup__form"),document.querySelector(".popup__input_type_place-name"),document.querySelector(".popup__input_type_link"),document.querySelector(".popup__button_invalid"),document.querySelector(".popup_type_place-image")),m=(h.querySelector(".popup__image"),h.querySelector(".popup__close-btn"),h.querySelector(".popup__image-title"),document.querySelector(".cards"),document.querySelector(".profile__avatar")),b=new class{constructor(e){this._baseUrl=e.baseUrl,this._headers=e.headers}_checkResponse(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}_request(e,t){return fetch(`${this._baseUrl}${e}`,t).then(this._checkResponse)}getUserInfo(){return this._request("/users/me",{headers:this._headers})}getInitialCards(){return this._request("/cards",{headers:this._headers})}editProfile(e){return this._request("/users/me",{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})})}addNewCard(e){return this._request("/cards",{method:"POST",headers:this._headers,body:JSON.stringify({name:e.place,link:e.url})})}deleteCard(e){return this._request(`/cards/${e}`,{method:"DELETE",headers:this._headers})}setLike(e,t){return this._request(`/cards/${e}/likes`,{method:t,headers:this._headers})}addNewAvatar(e){return this._request("/users/me/avatar",{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.url})})}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-59",headers:{authorization:"cb509dca-886f-481d-bcb8-759a1762ab1b","Content-Type":"application/json"}});Promise.all([b.getUserInfo(),b.getInitialCards()]).then((([e,t])=>{S.setUserInfo(e),B.renderItems(t)})).catch((e=>{console.log(e)}));const S=new class{constructor({nameSelector:e,infoSelector:t,avatarSelector:s}){this._nameElement=document.querySelector(e),this._infoElement=document.querySelector(t),this._avatarElement=document.querySelector(s)}getUserInfo(){const e={};return e.name=this._nameElement.textContent,e.info=this._infoElement.textContent,e}setUserInfo({name:e,about:t,avatar:s,_id:n}){this._nameElement.textContent=e,this._infoElement.textContent=t,this._avatarElement.src=s,this._id=n}getId(){return this._id}}({nameSelector:".profile__title",infoSelector:".profile__profession",avatarSelector:".profile__avatar"}),L=new o(".popup_type_profile",(e=>{L.renderLoading(!0),L.disableSubmitButton(),b.editProfile(e).then((e=>{S.setUserInfo(e),L.renderLoading(!0,"Сохранено!"),setTimeout((()=>L.close()),1e3)})).catch((e=>{console.log(e),L.renderLoading(!0,"Ошибка запроса!")})).finally((()=>{setTimeout((()=>{L.enableSubmitButton(),L.renderLoading(!1)}),1500)}))}));L.setEventListeners();const E=new o(".popup_type_add-place",(e=>{E.renderLoading(!0),E.disableSubmitButton(),b.addNewCard(e).then((e=>{E.renderLoading(!0,"Создано!"),B.addItem(e),setTimeout((()=>E.close()),1e3)})).catch((e=>{console.log(e),E.renderLoading(!0,"Ошибка запроса!")})).finally((()=>{setTimeout((()=>{E.enableSubmitButton(),E.renderLoading(!1)}),1500)}))}));E.setEventListeners();const v=new i(".popup_type_image");function y(e,t){v.open(e,t)}v.setEventListeners(),new i(".popup_type_view-avatar").setEventListeners();const g=new class extends n{constructor(e,t){super(e),this._handleFormSubmit=t,this._form=this._popupElement.querySelector(".popup__form"),this._submitButton=this._form.querySelector(".popup__save-btn"),this._submitButtonText=this._submitButton.textContent}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._card)}))}open(e){this._card=e,super.open()}disableSubmitButton(){this._submitButton.disabled=!0}enableSubmitButton(){this._submitButton.disabled=!1}renderLoading(e,t="Удаление..."){this._submitButton.textContent=e?t:this._submitButtonText}}(".popup_type_delete-card",(e=>{g.renderLoading(!0),g.disableSubmitButton(),b.deleteCard(e._id).then((()=>{g.renderLoading(!0,"Удалено!"),e.handleDeleteButtonClick(),g.close()})).catch((e=>{console.log(e)})).finally((()=>{setTimeout((()=>{g.enableSubmitButton(),g.renderLoading(!1)}),1e3)}))}));g.setEventListeners();const f=new o(".popup_type_new-avatar",(e=>{f.renderLoading(!0),f.disableSubmitButton(),b.addNewAvatar(e).then((e=>{S.setUserInfo(e),f.renderLoading(!0,"Сохранено!"),setTimeout((()=>f.close()),1e3)})).catch((e=>{console.log(e),f.renderLoading(!0,"Ошибка запроса!")})).finally((()=>{setTimeout((()=>{f.enableSubmitButton(),f.renderLoading(!1)}),1e3)}))}));f.setEventListeners();const k=(e,t)=>{const s=t.isLiked()?"DELETE":"PUT";b.setLike(e,s).then((e=>{t.handleLikeButtonClick(),t.setLikesValue(e.likes)})).catch((e=>{console.log(e)}))},B=new class{constructor({renderer:e},t){this._renderer=e,this._container=document.querySelector(t)}renderItems(e){e.reverse().forEach((e=>{this.addItem(e)}))}addItem(e){this._container.prepend(this._renderer(e))}}({renderer:e=>new t(e,"#element-template",y,C,k,S.getId()).generateCard()},".cards");function C(e){g.open(e)}new s(e,r).enableValidation(),l.addEventListener("click",(function(){L.open();const{name:e,about:t}=S.getUserInfo();a.value=e,_.value=t})),p.addEventListener("click",(function(){E.open(),q.disableSubmitButton()})),m.addEventListener("click",(function(){f.open(),q.enableValidation()}));const q=new s(e,d,c);q.enableValidation()})();