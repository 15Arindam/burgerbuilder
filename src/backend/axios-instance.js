import axios from 'axios';

export const AUTH_KEY = '/* YOUR AUTH KEY FOR FIREBASE SIGN IN/SIGN UP */'

const instance = axios.create({
    baseURL : 'https://myburgerbuilder-c84b0.firebaseio.com/'
});

export const authInst = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    returnSecureToken : true
});

export const authLookup = axios.create({
    baseURL : `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${AUTH_KEY}`
})

export default instance;