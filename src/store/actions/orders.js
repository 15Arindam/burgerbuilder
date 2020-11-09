import { FETCH_ORDERS,FETCH_START } from '../actionTypes';
import axios from '../../backend/axios-instance';

export const fetchOrders = (uid) => dispatch => {
    dispatch({ type: FETCH_START, value: true });
    axios.get(`/orders.json?orderBy="userId"&equalTo="${uid}"`)
        .then(response => {
            // console.log('orders',response.data, uid);
            let keys = Object.keys(response.data);
            let newOrders = [];
            const wait = async() => {
                for(let key of keys){
                    let ingds = {};
                    response.data[key].orders && Object.keys(response.data[key].orders).map( ingd => {
                        if(response.data[key].orders[ingd] !== 'NaN'){
                            let temp = Array.from(response.data[key].orders[ingd].split(',')).length;
                            ingds[ingd] = temp;
                        }
                        return null;
                    });
                    newOrders.push({ ...response.data[key],orders: ingds, orderId: key });
                }
            }
            wait().then(()=>{
                dispatch({ type: FETCH_ORDERS, value: newOrders });
            })
        })
        .catch(error => console.log(error));
}
export const deleteOrder = (e,id) => (dispatch,getState) => {
    e.preventDefault();
    const {uid} = getState().Auth
    axios.delete(`/orders/${id}.json`)
    .then(res => {
        dispatch(fetchOrders(uid));
    })
    .catch(err => {
        console.log('del fail',err)
    })
}