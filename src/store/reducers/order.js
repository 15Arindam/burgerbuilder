import { FETCH_ORDERS, FETCH_START } from '../actionTypes';

const initialState = {
    orders: [],
    fetching: false
}

const orders = (state=initialState,action) => {
    const { type, value } = action;
    switch(type){
        case FETCH_ORDERS:
            return {
                ...state,
                orders: value,
                fetching: false
            }
        case FETCH_START:
            return{
                ...state,
                fetching: true
            }
        default:
            return state;
    }
}
export default orders;