export default class UserInfo {
  constructor(profileName, profileAbout, profileAvatarImage) {
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
    if (data.avatar !== undefined || data.avatar !== null) {
      this._avatar.src = data.avatar;
    }
    else {
      return false
    }
  }

  setUserInfo(userData) {
    if (userData.name !== undefined || data.avatar !== null) {
      this._name.textContent = userData.name;
      this._avatar.alt = `${userData.name} avatar`;
    }
    else {
      return false
    }
    if (userData.about !== undefined || data.avatar !== null) {
      this._caption.textContent = userData.about;
    }
    else {
      return false
    }
    this.setUserAvatar(userData);   
  }
}