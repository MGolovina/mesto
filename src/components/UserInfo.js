export default class UserInfo {
  constructor(profileName, profileAbout,profileAvatarImage ) {
    this._name = profileName;
    this._caption = profileAbout;
    this._avatar = profileAvatarImage;
  }

  getUserInfo() {
      this._userData = {
      name: this._name.textContent,
      about: this._caption.textContent,
         };
    return this._userData;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._caption.textContent = userData.about;
    this.setUserAvatar(userData);
    this._avatar.alt = `${userData.name} avatar`;
  }
}