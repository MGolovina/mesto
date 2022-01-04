class FormValidator {
  constructor(config, formName) {
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._formName = formName
    this._buttonElement = this._formName.querySelector(this._submitButtonSelector)
    this._inputList = Array.from(this._formName.querySelectorAll(this._inputSelector))
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else
      this._hideInputError(inputElement)
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formName.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.classList.add(this._errorClass)
    errorElement.textContent = errorMessage
  }

  _hideInputError(inputElement) {
    const errorElement = this._formName.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass)
    this._buttonElement.disabled = false
  }

  _toggleButtonState() {
    if (this._getInvalidInput(this._inputList)) {
      this.disableSubmitButton()
    } else {
      this.enableSubmitButton()
    }
  }

  _getInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    })
  }

  _setFormListeners() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass)
    this._buttonElement.disabled = true;
  }

  enableValidation() {
    this._setFormListeners()
  }
}

export default FormValidator;

