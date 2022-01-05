(()=>{"use strict";class e{constructor(e,t,s,i,r,{handleCardClick:n,handleDeleteCardClick:a,setLike:o,deleteLike:l}){this._data=e,this._postTemplate=t,this._imageSelectors=i,this._handleCardClick=n,this._handleDeleteCardClick=a,this._selectors=s,this._ownerId=r,this._id=e.id,this._setLike=o,this._deleteLike=l}_getCardTemplate(){return this._view=this._postTemplate.content.querySelector(".elements__card").cloneNode(!0),this._view}_deleteElem(e){e.remove(),e=null}deleteCard(){this._deleteElem(this._view)}setLikeCount(e){this._imageLikeCountSelector.textContent=String(e.likes.length)}_checkOwnCard(){this._data.owner._id!==this._ownerId&&this._deleteElem(this._imageTrashButton)}_checkLikeState(){this._data.likes.forEach((e=>{e._id===this._ownerId&&this._addLikedClass()}))}_like(e){this._addLikedClass(),this._setLike(e)}_dislike(e){this._removeLikedClass(),this._deleteLike(e)}_addLikedClass(){this._imageLikeButton.classList.add(this._imageSelectors.imageLikedButtonClass)}_removeLikedClass(){this._imageLikeButton.classList.remove(this._imageSelectors.imageLikedButtonClass)}_setEventListeners(){this._cardImg.addEventListener("click",(()=>{this._handleCardClick(this._data)})),this._imageLikeButton.addEventListener("click",(()=>{this._imageLikeButton.classList.contains(this._imageSelectors.imageLikedButtonClass)?this._dislike(this._data):this._like(this._data)})),this._imageTrashButton.addEventListener("click",this._handleDeleteCardClick)}renderCard(){return this._view=this._getCardTemplate(),this._imageLikeButton=this._view.querySelector(this._imageSelectors.imageLikeButton),this._imageLikeCountSelector=this._view.querySelector(this._imageSelectors.imageLikeCountSelector),this._imageTrashButton=this._view.querySelector(this._imageSelectors.imageTrashButton),this._imageTitle=this._view.querySelector(this._imageSelectors.imageTitle),this._cardImg=this._view.querySelector(this._imageSelectors.imageSelector),this.setLikeCount(this._data),this._cardImg.src=this._data.link,this._cardImg.alt=this._data.name,this._imageTitle.textContent=this._data.name,this._setEventListeners(),this._checkOwnCard(),this._checkLikeState(),this._view}}const t=class{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formName=t,this._buttonElement=this._formName.querySelector(this._submitButtonSelector),this._inputList=Array.from(this._formName.querySelectorAll(this._inputSelector))}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_showInputError(e,t){const s=this._formName.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),s.classList.add(this._errorClass),s.textContent=t}_hideInputError(e){const t=this._formName.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}enableSubmitButton(){this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.disabled=!1}_toggleButtonState(){this._getInvalidInput(this._inputList)?this.disableSubmitButton():this.enableSubmitButton()}_getInvalidInput(e){return e.some((e=>!e.validity.valid))}resetValidation(){this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))}_setFormListeners(){this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}disableSubmitButton(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.disabled=!0}enableValidation(){this._setFormListeners()}};class s{constructor(e){this._popup=e,this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popup.addEventListener("click",(e=>{(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&this.close()}))}}class i extends s{constructor(e,{submit:t}){super(e),this._submit=t,this._handleSubmit=this._handleSubmit.bind(this),this._form=this._popup.querySelector(".popup__form"),this._inputsList=Array.from(this._form.querySelectorAll(".popup__input")),this._submitButton=this._form.querySelector(".popup__button"),this._initialValueSubmitButton=this._submitButton.textContent}_handleSubmit(e){e.preventDefault(),this._submit(this._getInputValues())}_getInputValues(){const e={};return this._inputsList.forEach((t=>{e[t.name]=t.value})),e}renderLoading(e,t="Cохранение..."){this._submitButton.textContent=e?t:this._initialValueSubmitButton}setEventListeners(){this._form.addEventListener("submit",(e=>this._handleSubmit(e))),super.setEventListeners()}close(){this._form.reset(),super.close()}}const r=document.querySelector(".popup_profile-edit"),n=document.querySelector(".popup_card-add"),a=document.querySelector(".popup_zoom"),o=document.querySelector(".popup_update-avatar"),l=document.querySelector(".popup_confirm"),h=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__name"),u=document.querySelector(".profile__about"),d=document.querySelector(".profile__new-avatar"),c=document.querySelector(".profile__add-button"),p=document.querySelector(".profile__avatar-edit-button"),m=document.querySelector(".elements__container"),v=document.getElementById("postTemplate"),g=document.querySelector(".popup__input_type_name"),L=document.querySelector(".popup__input_type_about"),C={popupSelector:".popup",formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},S={imageSelector:".elements__image",imageCardSelector:".elements__card",imageLikeButton:".elements__like-button",imageTrashButton:".elements__card-button_trash",imageLikedButtonClass:"elements__like-button_active",imageLikeCountSelector:".elements__like-count",imageTitle:".elements__title"};let k=null,b=null;const E=new class{constructor(e,t,s){this._name=e,this._caption=t,this._avatar=s}getUserInfo(){return this._userData={name:this._name.textContent,about:this._caption.textContent},this._userData}setUserAvatar(e){if(void 0===e.avatar&&null===e.avatar)return!1;this._avatar.src=e.avatar}setUserInfo(e){return(void 0!==e.name||null!==data.avatar)&&(this._name.textContent=e.name,this._avatar.alt=`${e.name} avatar`,(void 0!==e.about||null!==data.avatar)&&(this._caption.textContent=e.about,void this.setUserAvatar(e)))}}(_,u,d),f=new class{constructor({renderer:e},t){this._renderer=e,this._container=t}addItem(e,t="prepend"){"append"===t?this._container.append(e):this._container.prepend(e)}renderItems(e){e.forEach((e=>{this._renderer(e)}))}}({renderer:e=>{const t=w(e);f.addItem(t.renderCard())}},m),y=new class extends s{constructor(e){super(e),this._popupImage=this._popup.querySelector(".popup__image"),this._popupFigCaption=this._popup.querySelector(".popup__figure-caption")}open(e){this._popupImage.src=e.link,this._popupImage.alt=e.name,this._popupFigCaption.textContent=e.name,super.open()}}(a),I=new class{constructor(e){this._url=e.url,this._headers=e.headers}_handleServerResponse(e){return e.ok?e.json():Promise.reject(`Error: ${e.status}`)}postCard(e){return fetch(`${this._url}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then(this._handleServerResponse)}deleteCard(e){return fetch(`${this._url}/cards/${e._id}`,{method:"DELETE",headers:this._headers}).then(this._handleServerResponse)}setLike(e){return fetch(`${this._url}/cards/likes/${e._id}`,{method:"PUT",headers:this._headers}).then(this._handleServerResponse)}deleteLike(e){return fetch(`${this._url}/cards/likes/${e._id}`,{method:"DELETE",headers:this._headers}).then(this._handleServerResponse)}setUserInfo(e){return fetch(`${this._url}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then(this._handleServerResponse)}setUserAvatar(e){return fetch(`${this._url}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatar})}).then(this._handleServerResponse)}getInitialData(){return Promise.all([this.getUserInfo(),this.getCards()])}getCards(){return fetch(`${this._url}/cards`,{method:"GET",headers:this._headers}).then(this._handleServerResponse)}getUserInfo(){return fetch(`${this._url}/users/me`,{method:"GET",headers:this._headers}).then(this._handleServerResponse)}}({url:"https://mesto.nomoreparties.co/v1/cohort-32",headers:{authorization:"dfec78ce-4ea7-4fc5-a44a-505604bfdc47","Content-Type":"application/json"}});I.getInitialData().then((e=>{console.log(e);const[t,s]=e;b=t._id,E.setUserInfo(t),f.renderItems(s.reverse())})).catch((e=>{console.log(e)}));const B=new class extends s{constructor(e,{submit:t}){super(e),this._popupElement=e,this._form=this._popupElement.querySelector(".popup__form"),this._submit=t,this._submitEvtHandler=this._submitEvtHandler.bind(this)}_submitEvtHandler(e){e.preventDefault(),this._submit(this._data),this._form.removeEventListener("submit",this._submitEvtHandler)}setEventListeners(){this._form.addEventListener("submit",this._submitEvtHandler),super.setEventListeners()}open(e){this._data=e,super.open()}}(l,{submit:e=>{I.deleteCard(e).then((()=>{k.deleteCard(e),k=null,B.close()})).catch((e=>{console.log(e)}))}}),w=t=>{const s=new e(t,v,C,S,b,{handleCardClick:e=>{y.open(e)},handleDeleteCardClick:()=>{k=s,B.open(t)},setLike:e=>{I.setLike(e).then((e=>{s.setLikeCount(e)})).catch((e=>{console.log(e)}))},deleteLike:e=>{I.deleteLike(e).then((e=>{s.setLikeCount(e)})).catch((e=>{console.log(e)}))}});return s},q=new i(n,{submit:e=>{q.renderLoading(!0),I.postCard(e).then((e=>{const t=w(e).renderCard();f.addItem(t,"prepend"),q.close()})).catch((e=>{console.log(e)})).finally((()=>{q.renderLoading(!1)}))}}),T=new i(r,{submit:e=>{T.renderLoading(!0,"Загрузка..."),I.setUserInfo(e).then((e=>{E.setUserInfo(e),T.close()})).catch((e=>{console.log(e)})).finally((()=>{T.renderLoading(!1)}))}}),U=new i(o,{submit:e=>{U.renderLoading(!0),I.setUserAvatar(e).then((e=>{E.setUserAvatar(e),U.close()})).catch((e=>{console.log(e)})).finally((()=>{U.renderLoading(!1)}))}});T.setEventListeners(),q.setEventListeners(),y.setEventListeners(),U.setEventListeners(),B.setEventListeners(),new t(C,r).enableValidation();const $=new t(C,n);$.enableValidation(),new t(C,o).enableValidation(),h.addEventListener("click",(()=>{const e=E.getUserInfo();g.value=e.name,L.value=e.about,T.open()})),c.addEventListener("click",(()=>{$.resetValidation(),q.open()})),p.addEventListener("click",(()=>{U.open()}))})();