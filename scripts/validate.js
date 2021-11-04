const cardElements = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 

  function enableValidation (formConfig) {
      const forms =  [...document.querySelectorAll(formConfig.formSelector)]
      forms.forEach((form) => setFormListeners(form, formConfig))     
  }

  function setFormListeners (form, cardElements ) {
      form.addEventListener('submit',handleSubmit);
      form.addEventListener('input', () => setSubmitButtonState(form, cardElements))
      const inputs = [...form.querySelectorAll(cardElements.inputSelector)]
      inputs.forEach(inputElement => {
          inputElement.addEventListener('input',
          ()=> handleFieldValidation(inputElement, form, cardElements) )
      })
      setSubmitButtonState(form, cardElements)
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  function setSubmitButtonState(form,cardElements) {
      const btn = form.querySelector(cardElements.submitButtonSelector);
      btn.disabled = !form.checkValidity();
      btn.classList.toggle(cardElements.inactiveButtonClass, !form.checkValidity())
  }

  
  function handleFieldValidation(input, form, cardElements) {
      console.log(input)
      if (!input.validity.valid) {
          showError(input, form, cardElements)
      } else {
        hideError(input, form, cardElements)
      }
  }

  function showError (input, form, cardElements) {
      const errorElement = form.querySelector(`#${input.id}-error`);
      input.classList.add(cardElements.inputErrorClass);
      errorElement.textContent = input.validationMessage;
    }

    function hideError (input, form, cardElements) {
        const errorElement = form.querySelector(`#${input.id}-error`);
        input.classList.remove(cardElements.inputErrorClass);
        errorElement.textContent = '';
  
      }
      
  enableValidation(cardElements);
  
