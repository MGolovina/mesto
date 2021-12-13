class Card {
    constructor(item, selectors, postTemplate, handleCardClick) {
        this._name = item.name;
        this._link = item.link;
        this._postTemplate = postTemplate;
        this._handleCardClick = handleCardClick;
        this._selectors = selectors;
    }

    _getCardTemplate() {
        this._view = this._postTemplate.content
            .querySelector('.elements__card')
            .cloneNode(true)
        return this._view;
    };

    renderCard() {
        this._getCardTemplate();
        this._setEventListeners();
        this._view.querySelector('.elements__title').textContent = this._name
        this._cardImg = this._view.querySelector('.elements__image')
        this._cardImg.src = this._link
        this._cardImg.alt = this._name
        
        return this._view
    };

    _setEventListeners() {
        this._view.querySelector(".elements__like-button")
            .addEventListener('click', this._setLike);

        this._view.querySelector(".elements__card-button_trash")
            .addEventListener('click', this._deletePost);

        this._view.querySelector(".elements__image")
            .addEventListener('click', () =>
                this._handleCardClick(this._name, this._link)
            );
    }

    _setLike(event) {
        event.target.classList.toggle("elements__like-button_active");
    }

    _deletePost(event) {
        const currentDeleBtn = event.target;
        currentDeleBtn.closest(".elements__card").remove();
    }
}

export default Card;