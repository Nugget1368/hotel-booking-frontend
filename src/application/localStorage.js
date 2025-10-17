const USER_TOKEN_KEY = "user_token";
const USER_KEY = "user";
export class MySessionStorage {
    static getUserToken() {
        return sessionStorage.getItem(USER_TOKEN_KEY) ? JSON.parse(sessionStorage.getItem(USER_TOKEN_KEY)) : null;
    }
    static setUserToken(value) {
        sessionStorage.setItem(USER_TOKEN_KEY, JSON.stringify(value));
    }

    //TODO: Simple solution - this should be made as redux-store instead
    static saveUserInfo(user) {
        console.log(user);
        let userInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }
        sessionStorage.setItem(USER_KEY, JSON.stringify(userInfo));
    }

    static getUserInfo() {
        return sessionStorage.getItem(USER_KEY) ? JSON.parse(sessionStorage.getItem(USER_KEY)) : null;
    }
}