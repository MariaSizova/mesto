export class UserInfo {
  constructor({nameSelector, infoSelector}) {
      this._nameElement = document.querySelector(nameSelector);
      this._infoElement = document.querySelector(infoSelector);
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

  setUserInfo({ name, job }) {
      this._nameElement.textContent = name;
      this._infoElement.textContent = job;
  }
}
