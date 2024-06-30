const initialCards = [
{
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
},
{
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
},
{
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
},
{
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
},
{
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
},
{
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
},
];

/* -------------------------------------------------------------------------- */
/*                                   Element                                  */
/* -------------------------------------------------------------------------- */
const profileEditFormElement = document.querySelector('#edit-form');
const addFormElement = document.querySelector('#add-form');
/* ^^ Form Elements ^^ */
const editProfile = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit");
const editClose = document.querySelector('#editClose');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileEditName = document.querySelector("#profile-name-input");
const profileEditBio = document.querySelector("#profile-bio-input");
/* ^^ Edit Form ^^ */
const addButton = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector("#add");
const cardTitle = document.querySelector(".card__title");
const cardImage = document.querySelector(".card__image");
const addCardTitle = document.querySelector("#post-title-input");
const addCardImage = document.querySelector("#post-image-url-input");
const addClose = document.querySelector("#addClose");
const cardTitleInput = addFormElement.querySelector('.modal__input_type_title');
const cardImageInput = addFormElement.querySelector('.modal__input_type_url');
/* ^^ Add Form ^^ */
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");
/* ^^ Template & List ^^ */
const modalImage = document.querySelector('#image');
const imageClose = document.querySelector('#imageClose');
const modalTitle = document.querySelector('.modal__description');
/* ^^ Image Display ^^ */

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function openPopup(popup) {
    popup.classList.add('modal_opened');
}

function closePopup(modal) {
    modal.classList.remove('modal_opened');
}

function displayImage(imageURL, name) {
    const modalImage = document.querySelector('.modal__image');
    const modalTitle = document.querySelector('.modal__description');

    modalImage.src = imageURL;
    modalImage.alt = name;
    modalTitle.textContent = name;
}

function renderCard(data, wrapper) {
    const cardElement = getCardElement(data);
    wrapper.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSumbit (evt) {
    evt.preventDefault();
    profileName.textContent = profileEditName.value;
    profileBio.textContent = profileEditBio.value;
    closePopup(profileEditModal);
}

function handleProfileAddSubmit (evt) {
    evt.preventDefault();
    const name = cardTitleInput.value;
    const link = cardImageInput.value;
    renderCard({name, link}, cardList);
    closePopup(cardAddModal);

    cardTitleInput.value = '';
    cardImageInput.value = '';
}

function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector('.card__trash');
    const likeButton = cardElement.querySelector(".card__button");

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;

    deleteButton.addEventListener('click', function() {
        cardElement.remove();
    });

    cardImage.addEventListener('click', function() {
        openPopup(modalImage);
        displayImage(data.link, data.name);
    });

    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('active');
    });

    return cardElement;
};

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
editProfile.addEventListener("click", function (){
    profileEditName.value = profileName.textContent;
    profileEditBio.value = profileBio.textContent;
    openPopup(profileEditModal);
});

editClose.addEventListener("click", function () {
    closePopup(profileEditModal);
});

/* ^^ Edit Form Events ^^ */

// Form Elements
profileEditFormElement.addEventListener("submit", handleProfileEditSumbit);
addFormElement.addEventListener("submit", handleProfileAddSubmit);
// ^^

addButton.addEventListener("click", function() {
    openPopup(cardAddModal);
});

addClose.addEventListener("click", function (){
    closePopup(cardAddModal);
});

/* ^^ Add Form Events ^^ */

imageClose.addEventListener('click', function() {
    closePopup(modalImage);
});

/* ^^ Image Form Event ^^ */

initialCards.forEach(function(data){
    renderCard(data, cardList);
});

/* ^^ User Card Input Data ^^ */