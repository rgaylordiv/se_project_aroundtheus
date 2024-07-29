export default class UserInfo {
    constructor(profileName, jobProfile){
        this._profileName = profileName;
        this._jobProfile = jobProfile;
    }

    getUserInfo(){
        return{
            name: this._profileName.textContent,
            job: this._jobProfile.textContent,
        };
    }

    setUserInfo(name, job){
        this._profileName.textContent = name;
        this._jobProfile.textContent = job;
    }
}