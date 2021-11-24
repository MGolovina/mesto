class Card {
    constructor(item, postTemplate) {
        this._name = item.name;
        this._link = item.link;
        this._postTemplate = postTemplate;
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