export default class Card {
    constructor(data, postTemplate, selectors, imageSelectors, ownerId, { handleCardClick, handleDeleteCardClick, setLike, deleteLike }) {
        this._data = data;
        this._postTemplate = postTemplate;
        this._imageSelectors = imageSelectors;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._selectors = selectors;
        this._ownerId = ownerId;
        this._id = data.id;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
    }

    _getCardTemplate() {
        this._view = this._postTemplate.content
            .querySelector('.elements__card')
            .cloneNode(true)
        return this._view;
    }

    _deleteElem(elem) {
        elem.remove();
        elem = null;
    }

    deleteCard() {
        this._deleteElem(this._view);
    }

    setLikeCount(data) {
        this._imageLikeCountSelector.textContent = String(data.likes.length);
    }

    _checkOwnCard() {
        if (this._data.owner._id !== this._ownerId) {
            this._deleteElem(this._imageTrashButton);
        }
    }

    _checkLikeState() {
        this._data.likes.forEach((likeOwner) => {
            if (likeOwner._id === this._ownerId) {
                this._addLikedClass();
            }
        })
    }

    _like(data) {
        this._addLikedClass();
        this._setLike(data);
    }

    _dislike(data) {
        this._removeLikedClass();
        this._deleteLike(data);
    }

    _addLikedClass() {
        this._imageLikeButton.classList.add(this._imageSelectors.imageLikedButtonClass);
    }

    _removeLikedClass() {
        this._imageLikeButton.classList.remove(this._imageSelectors.imageLikedButtonClass);
    }

    _setEventListeners() {
        this._cardImg.addEventListener('click', () => {
            this._handleCardClick(this._data);
        })
        this._imageLikeButton.addEventListener('click', () => {
            if (this._imageLikeButton.classList.contains(this._imageSelectors.imageLikedButtonClass)) {
                this._dislike(this._data);
            } else {
                this._like(this._data);
            }
        })
        this._imageTrashButton.addEventListener('click', this._handleDeleteCardClick);
    }

    renderCard() {
        this._view = this._getCardTemplate();
        this._imageLikeButton = this._view.querySelector(this._imageSelectors.imageLikeButton);
        this._imageLikeCountSelector = this._view.querySelector(this._imageSelectors.imageLikeCountSelector);
        this._imageTrashButton = this._view.querySelector(this._imageSelectors.imageTrashButton);
        this._imageTitle = this._view.querySelector(this._imageSelectors.imageTitle);
        this._cardImg = this._view.querySelector(this._imageSelectors.imageSelector);
        this.setLikeCount(this._data)
        this._cardImg.src = this._data.link;
        this._cardImg.alt = this._data.name;
        // this._view.setAttribute('id', `a${this._data._id}`);
        this._imageTitle.textContent = this._data.name;
        this._setEventListeners();
        this._checkOwnCard();
        this._checkLikeState();        
        return this._view;
    }
}

