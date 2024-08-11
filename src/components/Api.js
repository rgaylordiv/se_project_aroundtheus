export default class Api {
    constructor({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res){
        if (res.ok) {
            return res.json();
          }
          // if the server returns an error, reject the promise
          return Promise.reject(`Error: ${res.status}`);
        };

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._checkResponse);
      } //

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._checkResponse);
        }

    updateProfileInfo(name, about){
        console.log(`Updating profile with name: ${name}, about: ${about}`);
        return fetch(`${this._baseUrl}/users/me`, {
           method: 'PATCH',
           headers: this._headers,
           body: JSON.stringify({
            name: name,
            about: about,
           }),
        })
        .then(this._checkResponse)
        .then((data) => {
            console.log('API response:', data);  // Log response
            return data;
        });
    } //

    updateAvatar(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then(this._checkResponse);
    } //

    createCard({name, link}){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
             name,
             link,
            }),
         }).then(this._checkResponse);
    } //

    deleteCard(cardID){
        console.log('Deleting card with ID:', cardID);
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers,
         }).then(this._checkResponse);
    } //

    likeCard(cardID){
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: this._headers,
         }).then(this._checkResponse);
    } //

    dislikeCard(cardID){
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: this._headers,
         }).then(this._checkResponse);
    } //
}