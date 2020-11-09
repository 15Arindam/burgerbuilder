import {SET_USER,UNSET_USER, SIGN_UP, SET_REDIRECT, LOGGED_IN} from '../actionTypes';
import {setAlert} from './alerts';
import {setIngds} from './Ingds';
import axios,{authLookup} from '../../backend/axios-instance';

export const setUser = () => dispatch => {
    const token = localStorage.getItem('token');
    let val = {};
    authLookup.post('',{ idToken: token})
    .then(res => {
        // console.log('res',res)
        let uid = res.data.users[0].localId;
        axios.get(`/users/${uid}.json`)
        .then(res => {
            // console.log('res',res);
            const key = Object.keys(res.data);
            val = {uid: uid, name: res.data[key].username, email: res.data[key].email};
            dispatch({ type: SET_USER, value: val })
        })
        .catch(err => {
            console.log('err',err);
        })
    })
    .catch(err => {
        console.log('err',err)
    })   
}

export const setRedirectPath = (path) => dispatch => {
    dispatch({ type: SET_REDIRECT, value: path })
}

export const unsetUser = (e) => dispatch => {
    e.preventDefault()
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    dispatch({ type: UNSET_USER });
    dispatch(setIngds());
    dispatch(setRedirectPath(null))
    dispatch(setAlert('Successfully Logged Out','success'));
}

export const toggleAuthForm = (val) => dispatch =>{
    dispatch({ type: SIGN_UP, value: val });
}

export const loginChecker = () => dispatch => {
    dispatch({ type: LOGGED_IN });
}
