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

class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  getInitialCards(){
    return fetch(this._baseURL+"/cards", {headers: this._headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data)=>{
      return data
    })
    .catch(err =>{
      console.log(err)
    });
  }

  getUserInfo(){
    return fetch(this._baseURL+"/users/me", {headers: this._headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data)=>{
      return data
    })
    .catch(err =>{
      console.log(err)
    });
  }

  editUserInfo(name,about){
    return fetch(this._baseURL+"/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
  }

}



export default Api