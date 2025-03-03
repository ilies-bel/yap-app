import Cookies from "js-cookie";

export const ACCESS_TOKEN = 'access_token';
const ACCESS_TOKEN_EXPIRATION = 'expires_in';

export const tokenService = {
    setToken(token: string, expiresIn: number) {
        Cookies.set(ACCESS_TOKEN, token, {expires: new Date(Date.now() + expiresIn)});
        Cookies.set(ACCESS_TOKEN_EXPIRATION, (Date.now() + expiresIn).toString());
    },

    isTokenValid() {
        return Cookies.get(ACCESS_TOKEN);
    },

    removeToken() {
        Cookies.remove(ACCESS_TOKEN);
        Cookies.remove(ACCESS_TOKEN_EXPIRATION);
    },

    getToken() {
        return Cookies.get(ACCESS_TOKEN);
    },
    isTokenExpiringSoon() {
        return false;
    }
}