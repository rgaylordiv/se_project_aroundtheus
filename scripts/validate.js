
  function showInputError(formElement, inputElement, options, errorMessage){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("modal__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("modal__input-error_active");
  };
  
  function hideInputError(formElement, inputElement, options){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("modal__input_type_error");
    errorElement.classList.remove("modal__input-error_active");
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
  
  function toggleButtonState(inputList, buttonElement){
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("modal__button_disabled");
    } else {
      buttonElement.classList.remove("modal__button_disabled");
    }
  };
  
  function setEventListeners(formElement, options){
    const { inputSelector } = options;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector('.modal__button');
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputList, buttonElement);
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

  const config = ({
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal_input-error_active"
  });

  enableValidation(config)

