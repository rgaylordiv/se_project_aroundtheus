import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._inputList = this._popupElement.querySelectorAll('.modal__form-input');
        this._submitBtn = this._popupElement.querySelector('.modal__button');
        this._submitBtnText = this._submitBtn.textContent;
        this._profileImage = document.querySelector('.profile__image');
        this._profileImageButton = document.querySelector('.profile__image-edit');
        this._modalImage = document.querySelector('#profile');
        this._modalImageSubmit = this._modalImage.querySelector('#profile-button');
        this._imageSubmitHandler = this._handleImageSubmit.bind(this);
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

    //create a renderLoading method - see reviewer recommendation
    renderLoading(isLoading, loadingText='Saving...') {
        if(isLoading) {
            this._submitBtn.textContent = loadingText;
        } else {
            this._submitBtn.textContent = this._submitBtnText;
        }
    }

    _handleImageSubmit(){ //delete this
        evt.preventDefault();
        this._modalImage.classList.remove('modal_opened');
        this._modalImageSubmit.removeEventListener('submit', this._imageSubmitHandler);
    }

    setEventListeners(){
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const formValues = this._getInputValues();
            this._handleFormSubmit(formValues);
            //this._popupForm.reset(); //delete - reset the form only in block then
        });
        super.setEventListeners();
    }
}