const config = ({
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active"
});

  function showInputError(formElement, inputElement, options, errorMessage){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass); //
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass); //
  };
  
  function hideInputError(formElement, inputElement, options){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass); //
    errorElement.classList.remove(options.errorClass); //
    errorElement.textContent = "";
  };
  
  function checkInputValidity(formElement, inputElement, options){
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      showInputError(formElement, inputElement, options, errorMessage);
    } else {
      hideInputError(formElement, inputElement, options);
    }
  };
  
  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  function toggleButtonState(inputList, buttonElement, options){
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(options.inactiveButtonClass); //
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(options.inactiveButtonClass); //
      buttonElement.removeAttribute('disabled');
    }
  };
  
  function setEventListeners(formElement, options){
    const { inputSelector } = options;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector); //
  
    toggleButtonState(inputList, buttonElement, options);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputList, buttonElement, options);
      });
    });
  };

  function enableValidation(options){
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });

      setEventListeners(formElement, options);
    });
  };

  enableValidation(config);

