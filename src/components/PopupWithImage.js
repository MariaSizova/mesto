import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageElementImage = this._popupElement.querySelector('.popup__image');
        this._popupTitleElementImage = this._popupElement.querySelector('.popup__image-title');
      }

// При открытии отображается картинка и подпись

    open(name, link) {
        this._popupImageElementImage.src = link;
        this._popupImageElementImage.alt = name;
        this._popupTitleElementImage.textContent = name;
        super.open();
    }
}
