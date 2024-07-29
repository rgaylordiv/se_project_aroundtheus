import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import { initialCards, config } from '../utils/constants.js';

const profileEditFormElement = document.querySelector('#edit-form');
const addFormElement = document.querySelector('#add-form');

/* ^^ Form Elements ^^ */

const editProfile = document.querySelector(".profile__edit-button");
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileEditName = document.querySelector("#profile-name-input");
const profileEditBio = document.querySelector("#profile-bio-input");

/* ^^ Edit Form ^^ */

const addButton = document.querySelector(".profile__add-button");
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
    popupWithImage.open(cardData);
}

const popupEditForm = new PopupWithForm('#edit', handleProfileEditSumbit);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm('#add', handleProfileAddSubmit);
popupAddForm.setEventListeners();

const userInfo = new UserInfo(profileName, profileBio);

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSumbit (userData) {
    console.log(userData);
    const name = userData.name;
    const job = userData.bio;
    userInfo.setUserInfo(name, job);
    popupEditForm.close();
}

function handleProfileAddSubmit (evt) {
    evt.preventDefault();
    const name = cardTitleInput.value;
    const link = cardImageInput.value;
    renderCard({name, link}, cardList);
    popupAddForm.close();

    cardTitleInput.value = '';
    cardImageInput.value = '';
    addFormElement.reset();
}

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


addButton.addEventListener("click", function() {
    popupAddForm.open();
    addFormValidator.toggleButtonState();
});

/* ^^ Add Form Events ^^ */

/* -------------------------------------------------------------------------- */
/*                                  Validator                                 */
/* -------------------------------------------------------------------------- */


  const editFormValidator = new FormValidator(config, profileEditFormElement);
  const addFormValidator = new FormValidator(config, addFormElement);

  editFormValidator.enableValidation();
  addFormValidator.enableValidation();



  
  


