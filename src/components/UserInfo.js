export default class UserInfo {
    constructor(profileName, profileBio, profileImage){
        this._profileName = profileName;
        this._profileBio = profileBio;
        this._profileImage = profileImage;
    }

    getUserInfo(){
        return{
            name: this._profileName.textContent,
            job: this._profileBio.textContent,
            image: this._profileImage.src,
        };
    }

    setUserInfo(name, job){
        console.log(`Setting user info - Name: ${name}, Bio: ${job}`); // Log name and job
        console.log(this._profileName); // Ensure this is the correct element
        console.log(this._profileBio);  // Ensure this is the correct element
        this._profileName.textContent = name;
        console.log(`Updating name: ${name}`);
        this._profileBio.textContent = job;
        console.log(`Updating bio: ${job}`);
    }

    setUserPicture(image){
        this._profileImage.src = image;
    }
}