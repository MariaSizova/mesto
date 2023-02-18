export class UserInfo {
  constructor({nameSelector, infoSelector, avatarSelector}) {
      this._nameElement = document.querySelector(nameSelector);
      this._infoElement = document.querySelector(infoSelector);
      this._avatarElement = document.querySelector(avatarSelector);
  }

//Метод, который возвращает объект с данными пользователя.

  getUserInfo() {
      // создаём пустой объект и присваиваем name и info
      const userInfo = {};

      userInfo.name = this._nameElement.textContent;
      userInfo.info = this._infoElement.textContent;

      return userInfo;
  }

//Метод, который принимает новые данные пользователя и добавляет их на страницу.

  setUserInfo({ name, about, avatar, _id }) {
      this._nameElement.textContent = name;
      this._infoElement.textContent = about;
      this._avatarElement.src = avatar;
      this._id = _id;
  }

  getId() {
    return this._id;
}

}
