//#region Элементы управления
const popupProfile = document.querySelector('.popup_profile-edit');
const popupPlace = document.querySelector('.popup_card-add');
const popupCloseButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const formButton = document.querySelector('.popup__button')
const form = document.querySelector('.popup__form');
const nameField = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const aboutField = document.querySelector('.popup__input_type_about');
const profileAbout = document.querySelector('.profile__about');
const addButton = document.querySelector('.profile__add-button');
const placeNameField = document.querySelector('.popup__input_place_name');
const placeName = document.querySelector('.elements__title');
const placeUrlField = document.querySelector('.popup__input_place_url');
const btnAddPost = document.getElementById('btnPopupAddPost');
const popupPlaceZoom = document.querySelector(".popup__zoom");
const postZoomImg = document.querySelector('.popup__image');
const postZoomTitle = document.querySelector('.popup__figure-caption');
//#endregion

//#region Данные
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
let lastPostId = 0;
let dataPosts = [];
//#endregion

//#region Методы
function InitData(initialCards) {
    if (initialCards != undefined) {
        dataPosts = [];
        for (let i = 0; i < initialCards.length; i++)
            dataPosts.push(
                {
                    id: lastPostId++,
                    name: initialCards[i].name,
                    link: initialCards[i].link,
                    likesCount: 0
                }
            );
    }
}

function openPopup() {
    popupProfile.classList.add('popup_opened')
    nameField.value = profileName.textContent;
    aboutField.value = profileAbout.textContent;
}

function openPopupPlace() {
    popupPlace.classList.add('popup_opened')
    placeNameField.value = "";
    placeUrlField.value = "";
}

function openPopupPlaceZoom() {
    popupPlaceZoom.classList.add('popup_opened')
    let currentPostImg = event.target;
    postZoomImg.src = currentPostImg.src;
    postZoomImg.alt = currentPostImg.alt;   
    let currentPostTitle = currentPostImg.closest("li").querySelector(".elements__title");
    postZoomTitle.innerText = currentPostTitle.innerText;
}

function closePopup() {
    popupProfile.classList.remove('popup_opened');
    popupPlace.classList.remove('popup_opened');
    popupPlaceZoom.classList.remove('popup_opened');
}

function submitForm(event) {
    event.preventDefault()
    profileName.textContent = nameField.value;
    profileAbout.textContent = aboutField.value;
    closePopup();
}

function AddCloseEvent() {
    let closeButtons = document.getElementsByClassName('popup__close');
    for (let i = 0; i < closeButtons.length; i++)
        closeButtons[i].addEventListener('click', closePopup)
}
//#region Действия с постами

function AddPost() {
    event.preventDefault();
    initialCards.unshift(
        {
            name: placeNameField.value,
            link: placeUrlField.value
        }
    );
    closePopup();
    CreateCardsFromTemplate('pictures', 'postTemplate', initialCards);
}

function DeletePost() {
    let currentDeleBtn = event.target;
    initialCards.splice(currentDeleBtn.getAttribute("itemId"), 1);
    currentDeleBtn.closest("li").remove();
}

function LikePost() {
    let likeBtn = event.target;
    likeBtn.classList.add("elements__like-button_active");
    for (let i = 0; i < dataPosts.length; i++)
        if (dataPosts[i].id == likeBtn.getAttribute('itemid')) {
            dataPosts[i].likesCount++;
            break;
        }
}
//#endregion

//#region Создание карточек постов

function CreateCardFromTemplate(postTemplateId, name, link, id) {
    const postTemplate = document.getElementById(postTemplateId);
    let newCard = postTemplate.content.querySelector(".elements__card").cloneNode(true);
    let cardImg = newCard.querySelector(".elements__image");
    cardImg.src = link;
    cardImg.alt = name;
    cardImg.addEventListener('click', openPopupPlaceZoom);
    let cardTitle = newCard.querySelector(".elements__title");
    cardTitle.innerHTML = name;   
    let btnLike = newCard.querySelector(".elements__like-button");
    btnLike.addEventListener('click', function (event) {
        event.target.classList.toggle("elements__like-button_active");
    });
    let btnDelete = newCard.querySelector(".elements__card-button_trash");
    btnDelete.addEventListener('click', DeletePost);
    btnDelete.setAttribute("itemId", id);
    return newCard;
}
function CreateCardsFromTemplate(idContainer, postTemplateId, dataArray) {
    let container = document.getElementById(idContainer);
    if (container != undefined) {
        container.innerHTML = "";
        let ulTag = document.createElement('ul');
        ulTag.setAttribute('class', 'elements__container');
        for (let i = 0; i < dataArray.length; i++)
            ulTag.appendChild(CreateCardFromTemplate(
                postTemplateId, dataArray[i].name, dataArray[i].link, i)
            );
        container.appendChild(ulTag);
    }
}
//#endregion

//#endregion

//#region Точка входа
InitData(initialCards);
form.addEventListener('submit', submitForm);
editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopupPlace);
btnAddPost.addEventListener('click', AddPost);
AddCloseEvent();
CreateCardsFromTemplate('pictures', 'postTemplate', initialCards);
//#endregion