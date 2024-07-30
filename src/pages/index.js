//Imports
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import { initialCards, config } from '../utils/constants.js';
//

//Form Elements
const profileEditFormElement = document.forms['edit-form'];
const addFormElement = document.forms['add-form'];
//

//Edit Form
const editProfile = document.querySelector(".profile__edit-button");
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileEditName = document.querySelector("#profile-name-input");
const profileEditBio = document.querySelector("#profile-bio-input");
//

//Add Form
const addButton = document.querySelector(".profile__add-button");
const cardTitleInput = addFormElement.querySelector('.modal__input_type_title');
const cardImageInput = addFormElement.querySelector('.modal__input_type_url');
//

//List
const cardList = document.querySelector(".cards__list");
//

//Image Display
const modalImage = document.querySelector('#image');
const previewImage = modalImage.querySelector('.modal__image');
const modalTitle = document.querySelector('.modal__description');
//

/* -------------------------------------------------------------------------- */
/*                                   Classes                                  */
/* -------------------------------------------------------------------------- */

//Section
const section = new Section(
    {items: initialCards, renderer: (cardData) => {
        const cardElement = getCardElement(cardData);
        section.addItem(cardElement)
    }},
    '.cards__list'
);

section.renderItems();
//

//PopupWithImage
const popupWithImage = new PopupWithImage('#image');
popupWithImage.setEventListeners();
//

//PopupWithForm - Edit
const popupEditForm = new PopupWithForm('#edit', handleProfileEditSumbit);
popupEditForm.setEventListeners();
//

//PopupWithForm - Add
const popupAddForm = new PopupWithForm('#add', handleProfileAddSubmit);
popupAddForm.setEventListeners();
//

//UserInfo
const userInfo = new UserInfo(profileName, profileBio);
//

//Form Validator
const formValidators= {};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('id');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);

//To toggle the 'create' button on each click of the add modal
const addFormValidator = formValidators['add-form'];
//

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(data) {
    const cardElement = getCardElement(data);
    section.addItem(cardElement);
}

function getCardElement(cardData) {
    const card = new Card(cardData, '#card-template', handleImageClick);
    return card.getView();
}

function handleImageClick(cardData) {
    popupWithImage.open(cardData);
}

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

function handleProfileAddSubmit (formValue) {
    const name = formValue.title;
    const link = formValue.image;
    console.log(`Name: ${name}, Link: ${link}`);
    renderCard({name, link}, cardList);
    popupAddForm.close();
    addFormElement.reset();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//Edit Form Events
editProfile.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileEditName.value = userData.name;
    profileEditBio.value = userData.job;
    popupEditForm.open();
});
//

//Add Form Events
addButton.addEventListener("click", function() {
    popupAddForm.open();
    addFormValidator.toggleButtonState();
});
//



  
  


