
export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._handleLikeClick());

        this._deleteButton.addEventListener('click', () => this._handleDeleteClick());

        this._cardImage.addEventListener('click', () => {
            this._handleImageClick({
                link: this._link, 
                name: this._name,
                src: this._link
            });
        })
    }

    _handleLikeClick (){
        this._likeButton.classList.toggle('active');
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
        this._cardImage = this._element.querySelector('.card__image');
        this._cardImage.setAttribute('src', this._link)
        this._cardImage.alt = this._name;
        this._cardTitle = this._element.querySelector(".card__title").textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}
