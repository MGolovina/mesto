import { Popup } from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupFigCaption = this._popup.querySelector('.popup__figure-caption');
  }

  open(item) {
    this._popupImage.src = item.link;
    this._popupImage.alt = item.name;
    this._popupFigCaption.textContent = item.name;
    super.open();
  }
}