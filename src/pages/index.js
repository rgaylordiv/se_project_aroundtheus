//Imports
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import { initialCards, config } from '../utils/constants.js';
import Api from '../components/Api.js';
//

//Modal
const modal = document.querySelector('.modal'); //
const profile = document.querySelector('#profile'); //
//

//Form Elements
const profileEditFormElement = document.forms['edit-form'];
const addFormElement = document.forms['add-form'];
const profileImageFormElement = document.forms['profile-form'];
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
const cardTitleInput = addFormElement.querySelector('.modal__input_type_title'); //
const cardImageInput = addFormElement.querySelector('.modal__input_type_url'); //
//

//Profile Image Form
const profileImageEdit = document.querySelector('.profile__image-edit');
const profileImage = document.querySelector('.profile__image');
const profileImageInput = document.querySelector('#profile-image-url-input'); //
//

//List
const cardList = document.querySelector(".cards__list"); //
const cardTemplate = document.querySelector('#card-template'); //
const card = document.querySelector('.card'); //
//

//Card
const likeButton = document.querySelector('.card__button'); //
//const deleteButton = cardElement.querySelectorAll('.card__trash'); //
const deleteButtonSubmit = document.querySelector('#delete-button'); //
const modalDelete = document.querySelector('#delete'); //
//

//Image Display
const modalImage = document.querySelector('#image');
const previewImage = modalImage.querySelector('.modal__image'); //
const modalTitle = document.querySelector('.modal__description'); //
//

/* -------------------------------------------------------------------------- */
/*                                   Classes                                  */
/* -------------------------------------------------------------------------- */

//Api
const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
        authorization: "2d74b34c-f524-4ec8-a70b-ae8ff175319b",
        "Content-Type": "application/json"
    }
});
//

//Section
const section = new Section(
    {/*items: initialCards,*/renderer: (cardData) => {
        const cardElement = getCardElement(cardData);
        section.addItem(cardElement)
     }},
    '.cards__list'
);
//

//UserInfo
const userInfo = new UserInfo(profileName, profileBio, profileImage);
//

api
    .getUserInfo()
    .then((data) => {
        console.log(data); ///take this out this was to make sure right thing was being called
        const name = data.name;
        const job = data.about;
        const image = data.avatar
        console.log(name);
        console.log(job);
        userInfo.setUserInfo(name, job);
        userInfo.setUserPicture(image);
    })
    .catch((err) => {
        console.error(err);
      });

/*api
    .getInitialCards()
    .then((res) => { //might need parameter of res, if so replace initialCards with res
        const section = new Section(
            {items: res, renderer: (cardData) => {
                const cardElement = getCardElement(cardData);
                section.addItem(cardElement)
            }},
            '.cards__list'
        );
        section.renderItems();
    })
    .catch((err) => {
        console.error(err);
    });*/

api
    .getInitialCards()
    .then((cards) => {
        /*cards.forEach(cardData => {
            section.renderItems(cardData); //use renderItems(section)
        });*/
        section.items = cards;
        section.renderItems();
    })
    .catch(err => {
        console.error(err);
    });



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

//PopupWithForm - Profile
const popupProfileImage = new PopupWithForm('#profile', handleProfileImageSubmit);
popupProfileImage.setEventListeners();
//

//Popup - Delete Button
const popupDeleteButton = new PopupWithConfirmation('#delete', handleDeleteButtonSubmit); //create PopupWithConfirmation for managing this modal
popupDeleteButton.setEventListeners();
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
const editFormValidator = formValidators['edit-form'];
const addFormValidator = formValidators['add-form'];
const profileFormValidator = formValidators['profile-form'];
//


/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(data) {
    const cardElement = getCardElement(data);
    section.addItem(cardElement);
}

function getCardElement(cardData) {
    console.log(cardData);
    const card = new Card(cardData, '#card-template', handleImageClick, handleCardDelete, handleCardLike, handleCardDislike);
    return card.getView();
}

function showErrorMessage(err){ //
    const messageElement = document.querySelector('.modal__button');
    messageElement.textContent = `Error: ${err}`;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleImageClick(cardData) {
    popupWithImage.open(cardData);
}

function handleCardLike(card){
    api
        .likeCard(card._id)
        .then(() => {
            card.cardIsLiked(true);
        })
        .catch((err) => {
            console.log(err);
        });
}

function handleCardDislike(card) {
    api
        .dislikeCard(card._id)
        .then(() => {
            card.cardIsLiked(false);
        })
        .catch((err) => {
            console.error(err);
        });
}

function handleSubmit(request, popupInstance, loadingText = 'Saving...'){
    popupInstance.renderLoading(true, loadingText);
    request()
        .then(() => {
            popupInstance.close();
        })
        .catch(console.error) //can add showErrorMessage() here if wanted
        .finally(() => {
            popupInstance.renderLoading(false);
        });
}

function handleProfileEditSumbit (userData) {
    const name = userData.name;
    const job = userData.bio;
    console.log(name);
    console.log(job);
    function makeRequest(){
        return api.updateProfileInfo(name, job)
        /*.then(() => {
            return api.getUserInfo();
        })*/
        .then(() => {
            userInfo.setUserInfo(name, job);
            //popupEditForm.close(); not needed because it is done with handleSubmit
            profileEditFormElement.reset();
        })
        /*.catch((err) => {
            showErrorMessage();
            console.error(err);
        })*/
    }
    handleSubmit(makeRequest, popupEditForm);
}

function handleProfileAddSubmit (formValue) {
    function makeRequest() {
        return api.createCard({name: formValue.title, link: formValue.image})
        .then((data) => {
            renderCard(data);
            popupAddForm.close();
            addFormElement.reset();
        });
        /*.catch((err) => {
            showErrorMessage();
            console.error(err);
        })*/
    }
    handleSubmit(makeRequest, popupAddForm);
}

function handleProfileImageSubmit(userData) {
    function makeRequest(){
        return api.updateAvatar(userData.avatar)
        .then(() => {
            userInfo.setUserPicture(userData.avatar);
            popupProfileImage.close();
            profileImageFormElement.reset();
        })
        /*.catch((err) => {
            showErrorMessage();
            console.error(err);
        })*/
    }
    handleSubmit(makeRequest, popupProfileImage);
}

function handleCardDelete(data){
    //handleDeleteButtonSubmit(data);
    popupDeleteButton.open();
    popupDeleteButton.setSubmitAction(() => handleDeleteButtonSubmit(data));
}

function handleDeleteButtonSubmit(card) {
    console.log('Card ID for deletion:', card._id); // Debug log
        api.deleteCard(card._id)
        .then(() => {
            card.removeCard(); // Remove card from DOM
            popupDeleteButton.close(); // Close the delete popup
        })
        .catch((err) => {
            console.error(err);
        });
    }

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//Edit Form Events
editProfile.addEventListener("click", () => {
 //return the default button only in blocks finally
    const userData = userInfo.getUserInfo();
    profileEditName.value = userData.name;
    profileEditBio.value = userData.job;
    popupEditForm.open();
    editFormValidator.toggleButtonState();
});
//

//Add Form Events
addButton.addEventListener("click", function() {
    popupAddForm.open();
    addFormValidator.toggleButtonState();
});
//

//Profile Image Form
profileImageEdit.addEventListener('click', () => {
    popupProfileImage.open();
    profileFormValidator.toggleButtonState();
})
//
