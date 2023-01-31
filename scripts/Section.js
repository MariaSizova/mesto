export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы.
  }

//Метод, который отвечает за отрисовку всех элементов

renderItems(data) {
  data.forEach(item => {
    this._renderer(item); // вызываем renderer, передав item
  });
  }

// Метод, который принимает DOM-элемент и добавляет его в контейнер

  addItem(element) {
    this._container.prepend(element);
  }
}
