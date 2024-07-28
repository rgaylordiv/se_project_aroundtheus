import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popupElement.querySelector('.modal__image');
        this._imageTitle = this._popupElement.querySelector('.modal__description');
    }

    open(data) {
        this._image.src = data.link;
        this._image.alt = data.name;
        this._imageTitle.textContent = data.name;
        super.open();
    }

    close(){
        super.close();
    }

    setEventListeners(){
        super.setEventListeners();
    }
}