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
        .content
        .querySelector(".card")
        .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._likeButton.querySelector('.card__button').addEventListener('click', () => this._handleLikeClick);

        this._deleteButton.querySelector('.card__trash').addEventListener('click', () => this._handleDeleteClick);

        this._cardImageElement.querySelector(".card__image").addEventListener('click', () => {
            this._handleImageClick(this._name, this._link);
        })
    }

    _handleLikeClick (){
        this._likeButton.classList.toggle('active');
    }

    _handleDeleteClick () {
        this._deleteButton.closest('.card').remove();
    }

    getView() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._likeButton = this._element.querySelector('.card__button');
        this._deleteButton = this._element.querySelector('.card__trash');
        this._cardImageElement.src = this._link;
        this._cardImageElement.alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;

        return this._element;
    }
}