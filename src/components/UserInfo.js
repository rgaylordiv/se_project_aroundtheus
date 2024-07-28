export default class UserInfo {
    constructor(profileName, jobProfile){
        this._profileName = document.querySelector(profileName);
        this._jobProfile = document.querySelector(jobProfile);
    }

    getUserInfo(){
        return{
            name: this._profileName.textContent,
            job: this._jobProfile.textContent,
        };
    }

    setUserInfo(userData){
        this._profileName.textContent = userData.name;
        this._jobProfile.textContent = userData.job;
    }
}