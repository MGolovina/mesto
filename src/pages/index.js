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
const popupProfile = document.querySelector('.popup_profile-edit');
const popupPlace = document.querySelector('.popup_card-add');
const popupPlaceZoom = document.querySelector(".popup_zoom");
const popupAvatar = document.querySelector('.popup_update-avatar');
const popupConfirm = document.querySelector('.popup_confirm');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatarImage = document.querySelector('.profile__new-avatar')
const addButton = document.querySelector('.profile__add-button');
const updateAvatarButton = document.querySelector('.profile__avatar-edit-button');
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

const popupPlaceImageZoom = new PopupWithImage(popupPlaceZoom);

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
    section.renderItems(cardsData.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithConfirmation = new PopupWithConfirmation(popupConfirm, {
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

const popupAddPlace = new PopupWithForm(popupPlace, {
  submit: (data) => {
    popupAddPlace.renderLoading(true);
    api.postCard(data)
      .then((res) => {
        const card = createCard(res);
        const cardElement = card.renderCard();
        section.addItem(cardElement, 'prepend');
        popupAddPlace.close()
      }
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddPlace.renderLoading(false);
      })
  }
});

const popupNewProfile = new PopupWithForm(popupProfile, {
  submit: (data) => {
    popupNewProfile.renderLoading(true, 'Загрузка...');
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupNewProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupNewProfile.renderLoading(false);
      })
  }
});

const popupWithAvatar = new PopupWithForm(popupAvatar, {
  submit: (data) => {
    popupWithAvatar.renderLoading(true);
    api.setUserAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupWithAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAvatar.renderLoading(false);
      })
  }
})

popupNewProfile.setEventListeners();
popupAddPlace.setEventListeners();
popupPlaceImageZoom.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithConfirmation.setEventListeners();

const profileEditFormValidator = new FormValidator(selectors, popupProfile);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(selectors, popupPlace);
cardAddFormValidator.enableValidation();
const avatarEditValidator = new FormValidator(selectors, popupAvatar);
avatarEditValidator.enableValidation();


//#endregion

//#region Обработчики событий

editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameField.value = userData.name;
  aboutField.value = userData.about;
  popupNewProfile.open();
});

addButton.addEventListener('click', () => {
  cardAddFormValidator.resetValidation();
  popupAddPlace.open();
  
});

updateAvatarButton.addEventListener('click', () => {
  popupWithAvatar.open();
});

//#endregion
