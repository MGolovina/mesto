import initialCards from "./data.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//#region Элементы управления
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
const profileForm = document.querySelector('.popup__form_profile');
const nameField = document.querySelector('.popup__input_type_name');
const ESC_KEY = "Escape";
const postTemplate = document.getElementById('postTemplate');
const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 

//#endregion

//#region Методы
function createCard(item) {
    const card = new Card(item, selectors, postTemplate, handleCardClick, openPopup, closePopup);
    const cardElement = card.renderCard();
    return cardElement;
}

initialCards.forEach((item) => {
    const card = createCard(item);
    postsContainer.append(card);
});

function handleCardClick (name, link) {   
        postZoomTitle.textContent = name;
        postZoomImg.alt = name;
        postZoomImg.src = link;
        openPopup(popupPlaceZoom);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);

}

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openProfilePopup() {
    openPopup(popupProfile);
    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;
}

function openPopupPlace() {
    placeNameField.value = "";
    placeUrlField.value = "";
    cardAddFormValidator.disableSubmitButton();
    openPopup(popupPlace);
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

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
            }
            if (evt.target.classList.contains('popup__close')) {
                closePopup(popup)
              }
        })
    })

//#endregion

//#region Действия с постами

function addPost(event) {
    event.preventDefault();
    postsContainer.prepend(
        createCard({
            name: placeNameField.value,
            link: placeUrlField.value
        },)
            );
    closePopup(popupPlace);
}

//#endregion

//#region Точка входа

profileForm.addEventListener('submit', submitProfileForm);
popupPlace.addEventListener('submit', addPost);
editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openPopupPlace);
popupPlace.addEventListener('submit', addPost);

//#endregion




