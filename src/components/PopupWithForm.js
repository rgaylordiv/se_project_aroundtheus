import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._inputList = this._popupElement.querySelectorAll('.modal__form-input');
    }

    _getInputValues(){
        this._formValue = {};

        this._inputList.forEach((input) => {
            console.log(`Input Name: ${input.name}, Input Value: ${input.value}`);
            this._formValue[input.name] = input.value;
        });

        return this._formValue;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners(){
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const formValues = this._getInputValues();
            this._handleFormSubmit(formValues);
            this._popupForm.reset();
        });
        super.setEventListeners();
    }
}