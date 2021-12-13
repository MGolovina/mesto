import { Popup } from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._form = this._popup.querySelector('.popup__form');
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  _getInputValues() {
    const inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    const data = {};
    inputsList.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => this._handleSubmit(evt));
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}