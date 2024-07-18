
export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardElement;
    }

    _handleLikeClick (evt){
        evt.target.classList.toggle('active');
    }

    _handleDeleteClick (evt) {
        evt.target.closest('card').remove();
    }

    _handleImageClick(){
        modalImage.src = this._link;
        modalImage.alt = this._name;
        modalTitle.textContent = this._name;
       openPopup(modalImage);
    }

    _setEventListeners() {
        this._element.querySelector('.card__button').addEventListener('click', () => this._handleLikeClick);

        this._element.querySelector('.card__trash').addEventListener('click', () => this._handleDeleteClick);

        this._element.querySelector(".card__image").addEventListener('click', () => {
            this._handleImageClick(this._link, this._name);
        })
    }

    getView() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._likeButton = this._element.querySelector('.card__button');
        this._deleteButton = this._element.querySelector('.card__trash');
        this._element.querySelector('.card__image').setAttribute('src', this._link)
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;

        return this._element;
    }
}
