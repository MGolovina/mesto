const enableValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 

  function enableValid (formConfig) {
     const forms =  [...document.querySelectorAll(formConfig.formSelector)]
     forms.forEach((form) => setFormListeners(form, formConfig))     
  }

  function setFormListeners (form, enableValidation ) {
      form.addEventListener('submit',handleSubmit);
      form.addEventListener('input', () => setSubmitButtonState(form, enableValidation) )

      const inputs = [...form.querySelectorAll(enableValidation.inputSelector)]

      inputs.forEach(inputElement => {
          inputElement.addEventListener('input',
          ()=> handleFieldValidation(inputElement, form, enableValidation) )
      })
      setSubmitButtonState(form, enableValidation)
  }

  function handleSubmit(event) {
    event.preventDefault()
}

  function setSubmitButtonState(form,enableValidation) {
      const btn = form.querySelector(enableValidation.submitButtonSelector);
      btn.disabled = !form.checkValidity();
      btn.classList.toggle(enableValidation.inactiveButtonClass, !form.checkValidity())
  }

  function handleFieldValidation(input, form, enableValidation) {
      console.log(input)

      if (!input.validity.valid) {
          showError(input, form, enableValidation)

      } else {

        hideError(input, form, enableValidation)
      }
  }

  function showError (input, form, enableValidation) {
      const errorElement = form.querySelector(`#${input.id}-error`);
      input.classList.add(enableValidation.inputErrorClass);
      errorElement.textContent = input.validationMessage;
    }

    function hideError (input, form, enableValidation) {
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.remove(enableValidation.inputErrorClass);
        errorElement.textContent = '';
  
      }
  enableValid(enableValidation);
  
//   const newItemForm = document.querySelector('[name="new-item"]')

//   newItemForm.addEventListener('submit', ()=> {

//   })