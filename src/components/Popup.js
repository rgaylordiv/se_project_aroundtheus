export default class Popup{
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popupElement.classList.add("modal_opened"); 
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        console.log('closing modal');
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) =>{
        console.log(`${evt}`);
        if(evt.key === "Escape"){
            this.close();
        }
    }

    setEventListeners(){
        console.log('Setting event listeners'); // Debug log
        this._popupElement.addEventListener('click', (evt) => {
            console.log(`Clicked element: ${evt.target.className}`); // Debug log
            if(evt.target.classList.contains('modal_opened') || evt.target.classList.contains('modal__close')) {
                this.close();
            }
        });
    }
}