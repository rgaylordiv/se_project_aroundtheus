export default class LoadingMessage{
    constructor(modal){
        this._modal = modal;
        this._popup = document.querySelector('.modal');
    }

    editPost(){
        const messageElement = document.querySelector("#edit-post");
        messageElement.textContent = 'Saving...';
        setTimeout(() => this._popup.classList.remove('modal_opened'), 6000);
    }

    addPost(){
        const messageElement = document.querySelector('#new-post');
        messageElement.textContent = 'Creating...';
        setTimeout(() => this._popup.classList.remove('modal_opened'), 6000);
    }

    profileImage(){
        const messageElement = document.querySelector('#profile-button');
        messageElement.textContent = 'Saving...';
        setTimeout(() => this._popup.classList.remove('modal_opened'), 6000);
    }

    resetMessageEdit(){
        const messageElement = document.querySelector('#edit-post');
        messageElement.textContent = 'Save';
    }

    resetMessageProfile(){
        const messageElement = document.querySelector('#profile-button');
        messageElement.textContent = 'Save';
    }

    resetMessageAdd(){
        const messageElement = document.querySelector('#new-post');
        messageElement.textContent = 'Create';
    }
}