import Popup from "./Popup.js";

export default class Card {
    constructor(data, cardSelector, handleImageClick, handleDeleteButton, handleCardLike, handleCardDislike) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._handleDeleteButton = handleDeleteButton;
        this._handleCardLike = handleCardLike;
        this._handelCardDislike = handleCardDislike;
        this._deleteSubmitHandler = this._handleDeleteSubmit.bind(this);// Bind here
        this._imageSubmitHandler = this._handleImageSubmit.bind(this);
        this._id = data._id;
        this._isLiked = data.isLiked;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            if(this._isLiked){
                this._handelCardDislike(this);
            } else {
                this._handleCardLike(this);
            }
        });

        this._deleteButton.addEventListener('click', () => {
            console.log('trash clicked');
            this._modalDelete.classList.add('modal_opened');
            const messageElement = document.querySelector('#delete-button');
            messageElement.textContent = 'Yes';
            document.addEventListener('keydown', this.escPress.bind(this));
            this._deleteSubmit.addEventListener('submit', this._deleteSubmitHandler);
        })


        this._cardImage.addEventListener('click', () => {
            this._handleImageClick({
                link: this._link, 
                name: this._name,
                src: this._link
            });
        })
    }

    escPress(evt) {
        if (evt.key === 'Escape' && this._modalDelete) {
            this._modalDelete.classList.remove('modal_opened');
        }
    }

    _handleDeleteSubmit(evt) {
        console.log('this is working');
        evt.preventDefault(); // Prevent default delete submission
        const messageElement = document.querySelector('#delete-button');
        messageElement.textContent = 'Saving...';
        setTimeout(() => this._modal.classList.remove('modal_opened'), 6000);
        this._handleDeleteButton(this);
        this._modalDelete.classList.remove('modal_opened'); // Close the modal
        this._deleteSubmit.removeEventListener('submit', this._deleteSubmitHandler);
    }

    _handleImageSubmit(){
        evt.preventDefault();
        this._modalImage.classList.remove('modal_opened');
        this._modalImageSubmit.removeEventListener('submit', this._imageSubmitHandler);
    }

    removeCard(){
        this._element.remove();
        this._element = null;
    }

    cardIsLiked(isLiked) {
        this._isLiked = isLiked;
        this.showLikes();
    }

    showLikes(){
        if(this._isLiked) {
            this._likeButton.classList.add('active');
        } else {
            this._likeButton.classList.remove('active');
        }
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardElement;
    }


    getView() {
        this._element = this._getTemplate();
        
        this._modal = document.querySelector('.modal');
        this._profileImage = document.querySelector('.profile__image');
        this._profileImageButton = document.querySelector('.profile__image-edit');
        this._likeButton = this._element.querySelector('.card__button');
        this._deleteButton = this._element.querySelector('.card__trash');
        this._cardImage = this._element.querySelector('.card__image');
        this._cardImage.setAttribute('src', this._link)
        this._cardImage.alt = this._name;
        this._cardTitle = this._element.querySelector(".card__title").textContent = this._name;
        this._modalDelete = document.querySelector('#delete');
        this._deleteSubmit = this._modalDelete.querySelector('#delete-button');
        this._deleteSubmit = this._modalDelete ? this._modalDelete.querySelector('form') : null; // Ensure it's a form
        this._modalImage = document.querySelector('#profile');
        this._modalImageSubmit = this._modalImage.querySelector('#profile-button');

        this._setEventListeners();
        this.showLikes();

        return this._element;
    }
}
