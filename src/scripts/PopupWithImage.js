import { Popup } from "../scripts/Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageElementImage = this._popupElement.querySelector('.popup__image');
        this._popupTitleElementImage = this._popupElement.querySelector('.popup__image-title');
      }

// При открытии отображается картинка и подпись

    open(title, image) {
        this._popupImageElementImage.src = image;
        this._popupImageElementImage.alt = title;
        this._popupTitleElementImage.textContent = title;
        super.open();
    }
}

