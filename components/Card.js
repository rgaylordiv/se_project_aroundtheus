
export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {
        this._element.querySelector('.card__button').addEventListener('click', () => this._handleLikeClick());

        this._element.querySelector('.card__trash').addEventListener('click', () => this._handleDeleteClick());

        this._element.querySelector(".card__image").addEventListener('click', () => {
            this._handleImageClick(this._link, this._name);
        })
    }

    _handleLikeClick (){
        this._element.querySelector('.card__button').classList.toggle('active');
    }

    _handleDeleteClick () {
        this._element.remove();
        this._element = null;
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
        
        this._likeButton = this._element.querySelector('.card__button');
        this._deleteButton = this._element.querySelector('.card__trash');
        this._element.querySelector('.card__image').setAttribute('src', this._link)
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}
