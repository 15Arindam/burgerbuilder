import * as actionTypes from '../actionTypes';

const initialState = [];

const alertReducer = (state=initialState, action) => {
    const {type, value} = action;
    switch(type){
        case actionTypes.SHOW_ALERT:
            return [...state,value];
        case actionTypes.HIDE_ALERT:
            return state.filter( alert => alert.id !== value );
        default:
            return state;
    }
}

export default alertReducer;