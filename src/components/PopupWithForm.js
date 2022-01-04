import { Popup } from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submit}) {
    super(popupSelector);
    this._submit = submit;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__button')
    this._initialValueSubmitButton = this._submitButton.textContent;  
    
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  _getInputValues() {
    const data = {};
    this._inputsList.forEach(input => {
      data[input.name] = input.value;
    });
    return data;
  }

  renderLoading(isLoading, initialDownloadMessage = 'Cохранение...') {
    if (isLoading) {
      this._submitButton.textContent = initialDownloadMessage;
    } else {
      this._submitButton.textContent = this._initialValueSubmitButton;
    }
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