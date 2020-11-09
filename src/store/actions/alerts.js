import * as actionTypes from '../actionTypes';
import {v4 as uuidv4} from 'uuid';

export const setAlert = (msg,type) => dispatch => {
    const id =uuidv4();
    dispatch({
        type: actionTypes.SHOW_ALERT,
        value: {msg,type,id}
    });

    setTimeout(() => dispatch({ type: actionTypes.HIDE_ALERT, value: id }),3000)
} 