import '../pages/index.css';
// import initialCards from "../utils/data.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from '../components/Api.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//#region Элементы управления
const popupProfileSelector = document.querySelector('.popup_profile-edit');
const popupPlaceSelector = document.querySelector('.popup_card-add');
const popupPlaceZoomSelector = document.querySelector(".popup_zoom");
const popupAvatarSelector = document.querySelector('.popup__update-avatar');
const popupConfirmSelector = document.querySelector('.popup__confirm');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarImage = document.querySelector('.profile__new-avatar')
const addButton = document.querySelector('.profile__add-button');
const updateAvatarButton = document.querySelector('.profile__avatar-edit-button');
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
const imageSelectors = {
  imageSelector: '.elements__image',
  imageCardSelector: '.elements__card',
  imageLikeButton: '.elements__like-button',
  imageTrashButton: '.elements__card-button_trash',
  imageLikedButtonClass: 'elements__like-button_active',
  imageLikeCountSelector: '.elements__like-count',
  imageTitle: '.elements__title',
}
let tempCard = null;
let ownerId = null;

//#endregion

//#region Экземпляры классов

const userInfo = new UserInfo(profileName, profileAbout, profileAvatarImage);

const section = new Section({
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card.renderCard());
  }
}, postsContainer);

const popupPlaceZoom = new PopupWithImage(popupPlaceZoomSelector);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-32',
  headers: {
    authorization: 'dfec78ce-4ea7-4fc5-a44a-505604bfdc47',
    'Content-Type': 'application/json'
  }
});

api.getInitialData()
  .then((data) => {
    console.log(data);
    const [userData, cardsData] = data;
    ownerId = userData._id;
    userInfo.setUserInfo(userData);
    section.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

api.getCards()
  .then((data) => {
    // console.log(data);
    createCard(data[0]).renderCard();
  })
  .catch((err) => {
    console.log(err);
  });
  
const popupWithConfirmation = new PopupWithConfirmation(popupConfirmSelector, {
  submit: (data) => {
    api.deleteCard(data)
      .then(() => {
        tempCard.deleteCard(data);
        tempCard = null;
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})

const createCard = (data) => {
  const card = new Card(data, postTemplate, selectors, imageSelectors, ownerId, {
    handleCardClick: (data) => {
      popupPlaceZoom.open(data);
    },
    handleDeleteCardClick: () => {      
      tempCard = card;
      popupWithConfirmation.open(data);      
    },
    setLike: (data) => {
      api.setLike(data)
        .then((data) => {
          card.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteLike: (data) => {
      api.deleteLike(data)
        .then((data) => {
          card.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
  });
  return card;
}

const popupPlace = new PopupWithForm(popupPlaceSelector, {
  submit: (data) => {
    popupPlace.renderLoading(true);
    api.postCard(data)
      .then((res) => {
        const card = createCard(res);
        const cardElement = card.renderCard();
        section.addItem(cardElement, 'prepend');
      }
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupPlace.renderLoading(false);
        popupPlace.close()
      })
  }
});

const popupProfile = new PopupWithForm(popupProfileSelector, {
  submit: (data) => {
    popupProfile.renderLoading(true, 'Загрузка...');
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfile.renderLoading(false);
        popupProfile.close();
      })
  }
});

const popupWithAvatar = new PopupWithForm(popupAvatarSelector, {
  submit: (data) => {
    popupWithAvatar.renderLoading(true);
    api.setUserAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAvatar.renderLoading(false);
        popupWithAvatar.close();
      })
  }
})

popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupPlaceZoom.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithConfirmation.setEventListeners();

const profileEditFormValidator = new FormValidator(selectors, popupProfileSelector);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(selectors, popupPlaceSelector);
cardAddFormValidator.enableValidation();
const avatarEditValidator = new FormValidator(selectors, popupAvatarSelector);
avatarEditValidator.enableValidation();


//#endregion

//#region Обработчики событий

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameField.value = userData.name;
  aboutField.value = userData.about;
  popupProfile.open();
});

addButton.addEventListener('click', () => {
  popupPlace.open();
});

updateAvatarButton.addEventListener('click', () => {
  popupWithAvatar.open();
});

//#endregion
