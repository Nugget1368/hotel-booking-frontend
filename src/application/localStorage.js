const USER_TOKEN_KEY = "user_token";

export class MySessionStorage {
    static getUserToken() {
        return sessionStorage.getItem(USER_TOKEN_KEY) ? JSON.parse(sessionStorage.getItem(USER_TOKEN_KEY)) : null;
    }
    static setUserToken(value) {
        sessionStorage.setItem(USER_TOKEN_KEY, JSON.stringify(value));
    }
}