export default class UserInfo {
  constructor(profileName, profileAbout) {
    this._name = profileName;
    this._caption = profileAbout;
  }

  getUserInfo() {
      this._userData = {
      name: this._name.textContent,
      about: this._caption.textContent
         };
    return this._userData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._caption.textContent = userData.about;
  }
}