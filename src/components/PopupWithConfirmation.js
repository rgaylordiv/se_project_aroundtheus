import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        //this._modalDelete = this._popupElement.querySelector(popupSelector);
        //this._popupForm = this._popupElement.querySelector('.modal__form');
        //this._deleteSubmit = this._popupElement.querySelector('#delete-button');
        this._deleteSubmit = this._popupElement.querySelector('form'); 
        this._deleteSubmitHandler = this._handleDeleteSubmit.bind(this);// Bind here
    }

    open(){
        super.open();
        this._popupElement.querySelector('.modal__button').focus();//sets focus on the button
    }

    setEventListeners(){
        super.setEventListeners();
        this._deleteSubmit.addEventListener('submit', this._deleteSubmitHandler);
    }

    _handleDeleteSubmit(evt) { //delete this
        console.log('this is working');
        evt.preventDefault(); // Prevent default delete submission
        this._handleFormSubmit();
        //this.close();
        //this._deleteSubmit.removeEventListener('submit', this._deleteSubmitHandler);
    }

    setSubmitAction(action){
        this._handleFormSubmit = action;
    }
}