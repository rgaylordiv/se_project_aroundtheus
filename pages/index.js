import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

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

const popups = document.querySelectorAll('.modal');
const profileEditFormElement = document.querySelector('#edit-form');
const addFormElement = document.querySelector('#add-form');
const formInput = document.querySelector('.modal__form-input');
const closeButtons = document.querySelector('.modal__close'); 

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
const cardData = document.querySelector('#card-template');

/* ^^ Template & List ^^ */

const modalImage = document.querySelector('#image');
const imageClose = document.querySelector('#imageClose');
const modalTitle = document.querySelector('.modal__description');

/* ^^ Image Display ^^ */

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function displayImage(imageURL, name) {
    const modalImage = document.querySelector('.modal__image');
    const modalTitle = document.querySelector('.modal__description');

    modalImage.src = imageURL;
    modalImage.alt = name;
    modalTitle.textContent = name;
}

function handleImageClick() {
    cardImage.addEventListener('click', function() {
    openPopup(modalImage);
    displayImage(data.link, data.name);
});
}

function renderCard(data, wrapper) {
    const card = new Card(data, '#card-template', handleImageClick).getView();
    wrapper.prepend(getCardElement(data));
    //wrapper.prepend(card.getView());
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
    });//

    cardImage.addEventListener('click', function() {
        openPopup(modalImage);
        displayImage(data.link, data.name);
    });

    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('active');
    });//

    return cardElement;
};

function handleEscape(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      closePopup(openedModal);
    }
  };

function openPopup(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown",handleEscape);
  };
  
function closePopup(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscape);
  };

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
editProfile.addEventListener("click", function (){
    profileEditName.value = profileName.textContent;
    profileEditBio.value = profileBio.textContent;
    openPopup(profileEditModal);
});

/* ^^ Edit Form Events ^^ */

// Form Elements
profileEditFormElement.addEventListener("submit", handleProfileEditSumbit);
addFormElement.addEventListener("submit", handleProfileAddSubmit);
// ^^

addButton.addEventListener("click", function() {
    openPopup(cardAddModal);
});

/* ^^ Add Form Events ^^ */

initialCards.forEach(function(data){
    renderCard(data, cardList);
});

/* ^^ User Card Input Data ^^ */

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('modal_opened')) {
            closePopup(popup);
        }

        if(evt.target.classList.contains('modal__close')) {
            closePopup(popup);
        };
    });
});

/* ^^ Close Modal When Clicking Overlay/Escape Functionality ^^ */

/* -------------------------------------------------------------------------- */
/*                                  Validator                                 */
/* -------------------------------------------------------------------------- */

const config = ({
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__input-error_active"
  });

  const editFormValidator = new FormValidator(config, profileEditFormElement);
  const addFormValidator = new FormValidator(config, addFormElement);

  editFormValidator.enableValidation();
  addFormValidator.enableValidation();


