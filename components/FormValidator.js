export default class FormValidator {
    constructor(config, formElement){
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._form = formElement;
    }

    _showInputError(inputElement){
        this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = this._errorMessage;
        this._errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement){
        this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass); 
        this._errorElement.classList.remove(this._errorClass); 
        this._errorElement.textContent = "";
    }

    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, this._errorMessage);
          } else {
            this._hideInputError(inputElement);
    }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
          });
    }

    toggleButtonState(){
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass); //
            this._buttonElement.setAttribute('disabled', true);
          } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass); //
            this._buttonElement.removeAttribute('disabled');
          }
    }

    _setEventListeners(){
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // was Array.from
        this._buttonElement = this._form.querySelector(this._submitButtonSelector); //

        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
            this.toggleButtonState();
          });
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        
        this._setEventListeners();
        };

}


