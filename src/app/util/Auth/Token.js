import BrowserDatabase from 'Util/BrowserDatabase';

const AUTH_TOKEN = 'auth_token';

const setAuthorizationToken = token => BrowserDatabase.setItem(token, AUTH_TOKEN, 3600);

const getAuthorizationToken = () => BrowserDatabase.getItem(AUTH_TOKEN);

const isSignedIn = () => !!getAuthorizationToken();

export {
    setAuthorizationToken,
    getAuthorizationToken,
    isSignedIn
};
