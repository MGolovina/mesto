import '../pages/index.css';
import initialCards from "./data.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";


//#region Элементы управления
const popupProfileSelector = document.querySelector('.popup_profile-edit');
const popupPlaceSelector = document.querySelector('.popup_card-add');
const popupPlaceZoomSelector = document.querySelector(".popup_zoom");
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const addButton = document.querySelector('.profile__add-button');
const placeNameField = document.querySelector('.popup__input_place_name');
const placeUrlField = document.querySelector('.popup__input_place_url');
const postsContainer = document.querySelector('.elements__container');
const postTemplate = document.getElementById('postTemplate');
const selectors = {
    popupSelector: '.popup',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//#endregion

//#region Всплывающие окна

const popupProfile = new PopupWithForm(popupProfileSelector, submitProfileForm);
const popupPlace = new PopupWithForm(popupPlaceSelector, addPost);

//#endregion

const profileEditFormValidator = new FormValidator(selectors, popupProfileSelector);
profileEditFormValidator.enableValidation();

const cardAddFormValidator = new FormValidator(selectors, popupPlaceSelector);
cardAddFormValidator.enableValidation();

const section = new Section({ items: initialCards, renderer: createCard }, postsContainer);
section.renderItems();

const userInfo = new UserInfo(profileName, profileAbout);

//#region Методы

function handleCardClick(name, link) {
    const popupPlaceZoom = new PopupWithImage(popupPlaceZoomSelector);
    popupPlaceZoom.open({ name: name, link: link });
}

function createCard(item) {
    const card = new Card(item, selectors, postTemplate, handleCardClick);
    const cardElement = card.renderCard();
    return cardElement;
}

function submitProfileForm(userData) {
    userInfo.setUserInfo(userData);
    popupProfile.close();
    return false;
}

//#endregion

//#region Действия с постами

function addPost(event) {
    event.preventDefault;
    postsContainer.prepend(
        createCard({
            name: placeNameField.value,
            link: placeUrlField.value
        })
    );
    popupPlace.close();
    const btnAddPost = document.getElementById('btnPopupAddPost'); 
    btnAddPost.disabled = true;
}
//#endregion

//#region Обработчики событий

editButton.addEventListener('click', function () { popupProfile.open(popupProfile); });
addButton.addEventListener('click', function () { popupPlace.open(popupProfile); });

//#endregion




