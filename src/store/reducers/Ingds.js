import {UPDT_INGDS, SET_INGDS,POS_ARR } from '../actionTypes';

const initialState = {
    ingds : null,
    price : null,
    posArr: [],
    totalPrice: 7,
    // building: false
}

const Ingds = ( state=initialState, action ) => {
    const { type, value } = action;
    switch(type){
        case SET_INGDS:
            return{
                ...state,
                ingds: value.ingds,
                price: value.price,
                totalPrice: 7,
                posArr: []
            }
        case UPDT_INGDS:
            return{
                ...state,
                // building: true,
                ingds: value.ingds,
                totalPrice: value.total
            }
        case POS_ARR:
            return{
                ...state,
                posArr: value
            }
        default:
            return state;
    }
}

export default Ingds;