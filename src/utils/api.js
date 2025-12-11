/*
User routes
GET /users/me – Get the current user’s info
PATCH /users/me – Update your profile information
PATCH /users/me/avatar – Update avatar

Card routes
GET /cards – Get all cards
POST /cards – Create a card
DELETE /cards/:cardId – Delete a card
PUT /cards/:cardId/likes – Like a card
DELETE /cards/:cardId/likes – Dislike a card
*/

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(this._baseURL + "/cards", { headers: this._headers })
      .then((res) => _checkResponse(res))
      .then((data) => {
        return data;
      });
  }

  getUserInfo() {
    return fetch(this._baseURL + "/users/me", { headers: this._headers })
      .then((res) => _checkResponse(res))
      .then((data) => {
        return data;
      });
  }

  editUserInfo(name, about) {
    return fetch(this._baseURL + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => _checkResponse(res));
  }

  addNewCard(name, link) {
    return fetch(this._baseURL + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => _checkResponse(res));
  }

  editUserAvatar(link) {
    return fetch(this._baseURL + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => _checkResponse(res));
  }

  deleteCard(id) {
    return fetch(this._baseURL + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        id,
      }),
    }).then((res) => _checkResponse(res));
  }

  toggleLike(liked, id) {
    let method = null;
    if (liked) {
      method = "PUT";
    } else {
      method = "DELETE";
    }

    return fetch(this._baseURL + "/cards/" + id + "/likes", {
      method: method,
      headers: this._headers,
    }).then((res) => _checkResponse(res));
  }
}
export default Api;
