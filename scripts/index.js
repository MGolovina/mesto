import initialCards from "./data.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//#region Элементы управления
import { initialCards } from "./data.js";
import { Card } from "./Card.js";
const popupProfile = document.querySelector('.popup_profile-edit');
const popupPlace = document.querySelector('.popup_card-add');
const popupPlaceZoom = document.querySelector(".popup_zoom");
const editButton = document.querySelector('.profile__edit-button');
const formButton = document.querySelector('.popup__button');
const profileName = document.querySelector('.profile__name');
const aboutField = document.querySelector('.popup__input_type_about');
const profileAbout = document.querySelector('.profile__about');
const addButton = document.querySelector('.profile__add-button');
const placeNameField = document.querySelector('.popup__input_place_name');
const placeName = document.querySelector('.elements__title');
const placeUrlField = document.querySelector('.popup__input_place_url');
const btnAddPost = document.getElementById('btnPopupAddPost');
const postZoomImg = document.querySelector('.popup__image');
const postZoomTitle = document.querySelector('.popup__figure-caption');
const postsContainer = document.querySelector('.elements__container');
const popupEditCloseBtn = document.querySelector('.popup__close_edit');
const popupAddCloseBtn = document.querySelector('.popup__close_card');
const popupZoomCloseBtn = document.querySelector('.popup__close_zoom');
const profileForm = document.querySelector('.popup__form_profile');
const nameField = document.querySelector('.popup__input_type_name');
const ESC_KEY = "Escape";
<<<<<<< HEAD
const postTemplate = document.getElementById('postTemplate');
const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 
=======
const postTemplate = document.getElementById('postTemplate'); 
>>>>>>> b85f0db111d3684c9a4c1e297e5143d53ab6978d

//#endregion

//#region Методы

<<<<<<< HEAD
initialCards.forEach(element =>
    postsContainer.append(new Card(element, postTemplate).renderCard())
=======
initialCards.forEach(item => {
    const card = new Card(item, postTemplate);
    const cardItem = card.renderCard();
    postsContainer.prepend(cardItem);
}
   
>>>>>>> b85f0db111d3684c9a4c1e297e5143d53ab6978d
);

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function openProfilePopup() {
    openPopup(popupProfile);
    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function openPopupPlace() {
    //btnAddPost.classList.add(cardElements.inactiveButtonClass);
    btnAddPost.disabled = true;
    openPopup(popupPlace);
    placeNameField.value = "";
    placeUrlField.value = "";
}

function submitProfileForm(event) {
    event.preventDefault()
    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;
    closePopup(popupProfile);
}

const profileEditFormValidator = new FormValidator(selectors, popupProfile)
profileEditFormValidator.enableValidation()

const cardAddFormValidator = new FormValidator(selectors, popupPlace)
cardAddFormValidator.enableValidation()


//#endregion

//#region Действия с постами

function addPost() {
    event.preventDefault();
    postsContainer.prepend(
        new Card({
            name: placeNameField.value,
            link: placeUrlField.value
        },
            postTemplate).renderCard()
    );
    closePopup(popupPlace);
}

//#endregion

//#region Точка входа

profileForm.addEventListener('submit', submitProfileForm);
editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openPopupPlace);
btnAddPost.addEventListener('click', addPost);
popupEditCloseBtn.addEventListener('click', () => closePopup(popupProfile));
popupAddCloseBtn.addEventListener('click', () => closePopup(popupPlace));
popupZoomCloseBtn.addEventListener('click', () => closePopup(popupPlaceZoom));
popupProfile.addEventListener('click', closeByOverlayClick);
popupPlace.addEventListener('click', closeByOverlayClick);
popupPlaceZoom.addEventListener('click', closeByOverlayClick);

//#endregion




