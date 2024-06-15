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
const editProfile = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal");
const editClose = document.querySelector('.modal_close');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileEditName = document.querySelector("#profile-name-input");
const profileEditBio = document.querySelector("#profile-bio-input");
const profileEditForm = document.querySelector(".modal");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function closePopup() {
    profileEditModal.classList.remove("modal_opened");
}

function getCardElement(data) {
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handlerProfileEditSumbit (evt) {
    evt.preventDefault();
    profileName.textContent = profileEditName.value;
    profileBio.textContent = profileEditBio.value;
    closePopup();
}

function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;
    return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
editProfile.addEventListener("click", function (){
    profileEditName.value = profileName.textContent;
    profileEditBio.value = profileBio.textContent;
    profileEditModal.classList.add("modal_opened");
});

editClose.addEventListener("click", function () {
    closePopup();
});

profileEditForm.addEventListener("submit", handlerProfileEditSumbit);

initialCards.forEach(function(data){
    const cardElement = getCardElement(data);
    cardList.append(cardElement);
});