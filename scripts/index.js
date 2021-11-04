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
const popupEditCloseBtn = document.querySelector('.popup__close_edit');
const popupAddCloseBtn = document.querySelector('.popup__close_card');
const popupZoomCloseBtn = document.querySelector('.popup__close_zoom');
const profileForm = document.querySelector('.popup__form_profile');
const nameField = document.querySelector('.popup__input_type_name');
const ESC_KEY = "Escape";
const postTemplate = document.getElementById('postTemplate'); 
//#endregion

//#region Методы

initialCards.forEach(element =>
    postsContainer.append(createCardFromTemplate(
        'postTemplate', element.name, element.link, 0))
);

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
    if (evt.key === ESC_KEY) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closeByOverlayClick(evt) {
    if(evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
}
  
function openProfilePopup() {
    openPopup(popupProfile);
    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;
}

function openPopupPlace() {
    btnAddPost.classList.add(cardElements.inactiveButtonClass);
    btnAddPost.disabled = true;
    openPopup(popupPlace);  
    placeNameField.value = "";
    placeUrlField.value = "";   
}

function openPopupPlaceZoom(link, name) {
    openPopup(popupPlaceZoom)
    postZoomTitle.textContent = name; 
    postZoomImg.alt = name; 
    postZoomImg.src =  link;
} 
 
function submitProfileForm(event) {
    event.preventDefault()
    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;
    closePopup(popupProfile);
}
 
//#endregion

//#region Действия с постами

function addPost() {
    event.preventDefault();
    postsContainer.prepend(createCardFromTemplate('postTemplate',
    placeNameField.value,
    placeUrlField.value));
    closePopup(popupPlace);
}

function deletePost() {
    const currentDeleBtn = event.target;
    currentDeleBtn.closest(".elements__card").remove();
}
//#endregion

//#region Создание карточек постов

function createCardFromTemplate(postTemplateId, name, link, id) {  
    const newCard = postTemplate.content.querySelector(".elements__card").cloneNode(true);
    const cardImg = newCard.querySelector(".elements__image");
    cardImg.src = link;
    cardImg.alt = name;
    cardImg.addEventListener('click', openPopupPlaceZoom);
    const cardTitle = newCard.querySelector(".elements__title");
    cardTitle.textContent = name;
    const btnLike = newCard.querySelector(".elements__like-button");
    btnLike.addEventListener('click', function (event) {
        event.target.classList.toggle("elements__like-button_active");
    });
    const btnDelete = newCard.querySelector(".elements__card-button_trash");
    btnDelete.addEventListener('click', deletePost);
    cardImg.addEventListener('click', () => openPopupPlaceZoom(link, name)); 
    return newCard;
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




