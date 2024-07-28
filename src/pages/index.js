import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';


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

/* ^^ Form Elements ^^ */

const editProfile = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit");
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileEditName = document.querySelector("#profile-name-input");
const profileEditBio = document.querySelector("#profile-bio-input");

/* ^^ Edit Form ^^ */

const addButton = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector("#add");
const cardTitleInput = addFormElement.querySelector('.modal__input_type_title');
const cardImageInput = addFormElement.querySelector('.modal__input_type_url');

/* ^^ Add Form ^^ */

const cardList = document.querySelector(".cards__list");

/* ^^ Template & List ^^ */

const modalImage = document.querySelector('#image');
const previewImage = modalImage.querySelector('.modal__image');
const modalTitle = document.querySelector('.modal__description');

/* ^^ Image Display ^^ */

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(data, wrapper) {
    const cardElement = getCardElement(data);
    wrapper.prepend(cardElement);
}

/*function getCardElement(cardData) {
    const card = new Card(cardData, '#card-template', handleImageClick);
    const cardElement = card.getView();
    return cardElement;
}*/

const section = new Section(
    {items: initialCards, renderer: (cardData) => {
        const cardElement = getCardElement(cardData);
        section.addItem(cardElement)
    }},
    '.cards__list'
);

section.renderItems();

function getCardElement(cardData) {
    const card = new Card(cardData, '#card-template', handleImageClick);
    return card.getView();
}

const popupWithImage = new PopupWithImage('#image');
popupWithImage.setEventListeners();

function handleImageClick(cardData) {
    /*previewImage.src = link;
    previewImage.alt = name;
    modalTitle.textContent = name;
    openPopup(modalImage);*/
    popupWithImage.open(cardData);
}

const popupEditForm = new PopupWithForm('#edit', handleProfileEditSumbit);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('#add', handleProfileAddSubmit);
popupAddForm.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__bio');

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSumbit (userData) {
    //evt.preventDefault();
    //const userData = userInfo.setUserInfo();
    //profileName.textContent = userData.name;
    //profileBio.textContent = userData.job;
    const name = userData.name;
    const description = userData.job;
    userInfo.setUserInfo({name, description});
    popupEditForm.close();
}

function handleProfileAddSubmit (evt) {
    evt.preventDefault();
    const name = cardTitleInput.value;
    const link = cardImageInput.value;
    renderCard({name, link}, cardList);
    closePopup(cardAddModal);

    cardTitleInput.value = '';
    cardImageInput.value = '';
    addFormElement.reset();
}

/*function handleEscape(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      closePopup(openedModal);
    }
  };

function openPopup(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown",handleEscape);
  };*/
  
function closePopup(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscape);
  };

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
editProfile.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileEditName.value = userData.name;
    profileEditBio.value = userData.job;
    popupEditForm.open();
});

/* ^^ Edit Form Events ^^ */

// Form Elements
profileEditFormElement.addEventListener("submit", handleProfileEditSumbit);
addFormElement.addEventListener("submit", handleProfileAddSubmit);
// ^^

addButton.addEventListener("click", function() {
    popupAddForm.open();
    addFormValidator.toggleButtonState();
});

/* ^^ Add Form Events ^^ */


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



  
  


