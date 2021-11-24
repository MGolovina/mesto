<<<<<<< HEAD
class Card {
=======
// // принимает в конструктор её данные и селектор её template-элемента;
// // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// // содержит приватные методы для каждого обработчика;
// // содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
export class Card {
>>>>>>> b85f0db111d3684c9a4c1e297e5143d53ab6978d
    constructor(item, postTemplate) {
        this._name = item.name;
        this._link = item.link;
        this._postTemplate = postTemplate;
<<<<<<< HEAD
        this._view = this._getCardTemplate();
    }

    _getCardTemplate() {
        const newCard = this._postTemplate.content.querySelector(".elements__card").cloneNode(true);
        const cardImg = newCard.querySelector(".elements__image");
        cardImg.src = this._link;
        cardImg.alt = this._name;
        const cardTitle = newCard.querySelector(".elements__title");
        cardTitle.textContent = this._name;
        const btnLike = newCard.querySelector(".elements__like-button");
        btnLike.addEventListener('click', this._setLike);
        const btnDelete = newCard.querySelector(".elements__card-button_trash");
        btnDelete.addEventListener('click', this._deletePost);
        cardImg.addEventListener("click", () => { this._openZoom(this.link, this.name) });
        return newCard;
    }

    _deletePost() {
        const currentDeleBtn = event.target;
        currentDeleBtn.closest(".elements__card").remove();
    }

    _openZoom() {
        this._openPopupPlaceZoom(this._link, this._name)
    }

    _setLike() {
        event.target.classList.toggle("elements__like-button_active");
    }

    _closeByEsc(evt) {
        if (evt.key === "Escape") {            
            this._closePopup(document.querySelector('.popup_zoom'));
        }
    }

    _openPopup(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeByEsc.bind(this));
    }

    _closePopup(popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeByEsc);
    }

    _openPopupPlaceZoom(link, name) {
        this._openPopup(document.querySelector(".popup_zoom"))
        document.querySelector('.popup__figure-caption').textContent = name;
        document.querySelector('.popup__image').alt = name;
        document.querySelector('.popup__image').src = link;
    }

    renderCard() {
        return this._getCardTemplate();
    }
}

export default Card;
=======

        // this._handleCardClick = handleLikeCard;
    }

    _getCardTemplate() {
        this._view = document
          .querySelector(this._postTemplate)
          .content
          .querySelector('.elements__card')
          .cloneNode(true)
          return this._view;
    }

    renderCard() {
        this._getCardTemplate()
        // this._setEventListeners()
        this._cardImg = this._view.querySelector('.elements__image')
        this._cardImg.src = this._link
        this._cardImg.alt = this._name
        this._view.querySelector('.elements__title').textContent = this._name  
        return this._view
      }
    };

//       _setEventListeners() {
//         //Лайк
//         this._view
//         .querySelector('.elements__like-button')
//         .addEventListener('click', () => {
//           this._handleLikeCard()
//         })
    
//         //Удаление
//         this._view
//         .querySelector('.elements__card-button_trash')
//         .addEventListener('click', () => {
//           this._deletePost()
//         })
    
//         //Открытие попапа с изображением
//         this._view
//         .querySelector('.elements__image')
//         .addEventListener('click', () => {
//           this._openPopup();
//       }
    
//       _openPopup(popup) {
//         popup.classList.add('popup_opened');
//         document.addEventListener('keydown', closeByEsc);
//     };
//     //   //Лайк
//       handleLikeCard() {
//         const btnLike = this._view.querySelector(".elements__like-button");
//         btnLike.addEventListener('click', function (event) {
//             event.target.classList.toggle("elements__like-button_active");
//         });
// //         // const btnDelete = this._view.querySelector(".elements__card-button_trash");
// //         // btnDelete.addventListener('click', deletePost);
        
           
// //         addPost() {
// //             event.preventDefault();
// //             postsContainer.prepend(createCardFromTemplate('postTemplate', placeNameField.value,  placeUrlField.value));
// //             closePopup(popupPlace);
// //           };         

// //         deletePost() {
// //             this._view
// //             .closest('.elements__card')
// //             .remove()
// //           };
               
    

// //     //   handleRemoveCard() {
// //     //     this._view
// //     //     .closest('.elements__card')
// //     //     .remove()
// //     //   };
// //     };
>>>>>>> b85f0db111d3684c9a4c1e297e5143d53ab6978d
