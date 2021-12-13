import '../pages/index.css'; 
import initialCards from "../utils/data.js"
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";


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
const nameField = document.querySelector('.popup__input_type_name');
const aboutField = document.querySelector('.popup__input_type_about');
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

//#region Экземпляры кдассов
const userInfo = new UserInfo(profileName, profileAbout);
const popupPlaceZoom = new PopupWithImage(popupPlaceZoomSelector);
const popupProfile = new PopupWithForm(popupProfileSelector, submitProfileForm);
const popupPlace = new PopupWithForm(popupPlaceSelector, addPost);
popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupPlaceZoom.setEventListeners();
const profileEditFormValidator = new FormValidator(selectors, popupProfileSelector);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(selectors, popupPlaceSelector);
cardAddFormValidator.enableValidation();
const section = new Section({ items: initialCards, renderer: createCard }, postsContainer);
section.renderItems();
//#endregion


//#region Методы

function handleCardClick(name, link) {
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
}

function openProfilePopup() {
    profileEditFormValidator.resetValidation();
    const data = userInfo.getUserInfo();
    nameField.value = data.name;
    aboutField.value = data.about;
    popupProfile.open();
}

function openPopupPlace() {
    cardAddFormValidator.resetValidation();
    popupPlace.open();

}

//#endregion

//#region Действия с постами

function addPost() {
    postsContainer.prepend(
        createCard({
            name: placeNameField.value,
            link: placeUrlField.value
        })
    );
    popupPlace.close();    
}

//#endregion

//#region Обработчики событий

editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openPopupPlace);

//#endregion




