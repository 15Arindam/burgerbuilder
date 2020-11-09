import axios from '../../backend/axios-instance';
import { SET_INGDS, UPDT_INGDS, POS_ARR } from '../actionTypes';

export const setIngds = () => dispatch => {
    axios.get("/ingredients.json")
    .then(response => {
        let ingds = {};
        Object.keys(response.data).map( ingd => {
            ingds[ingd] = [];
            return ingd;
        });
            axios.get('/ingredientsPrice.json')
            .then(response => {
                dispatch({ type: SET_INGDS, value:{ price: response.data, ingds: ingds } })
            })
            .catch(error => {
                console.log(error);
            })
    })
    .catch(error => console.log(error));
}

export const getPosArr = (Ingredients) => (dispatch) => {
    let posArr = [];
    const solve = new Promise((res,rej) => {
        Object.keys(Ingredients).map((ingd) => {
            return [...Array(Ingredients[ingd])].map((abc) =>{
                for(let i in abc){
                    posArr[abc[i]]=ingd;
                }
                return  null;
            });
        })
        res(posArr)
    })
    solve.then(() => {
        dispatch({ type: POS_ARR, value: posArr });
    })
}
export const UpdateItemsList = (newPrice, currIngds) => dispatch =>{
    dispatch({ type: UPDT_INGDS, value:{ total: newPrice, ingds: currIngds } });
    dispatch(getPosArr(currIngds));
}
export const AddItemsList = (itempos,currIngds) => (dispatch,getState) => {
    let ingList = {...currIngds};
    // console.log('actions UpdateItemsList ', ingList,itempos)
    let [item,Itmpos] = itempos.split('~'); 
    let index = ingList[item].length;
    ingList[item][index] = Number.parseInt(Itmpos);
    
    let itmPrice = getState().Ingds.price[item];
    let newPrice = getState().Ingds.totalPrice + itmPrice;
        dispatch({ type: UPDT_INGDS, value:{ total: newPrice, ingds: ingList } });
        dispatch(getPosArr(currIngds));
}
export const RemoveItemsList = (itempos,currIngds) => (dispatch,getState) => {
    let ingList = {...currIngds};
    let [item,Itmpos] = itempos.split('~'); 
    let pos = ingList[item].indexOf(Number.parseInt(Itmpos));
    ingList[item].splice(pos,1);
    for(let i in ingList){
         ingList[i].map((val,index) => {
            if(Itmpos < val){
                ingList[i][index] = --val;
            }
            return null;
        });
    }
    let itmPrice = getState().Ingds.price[item];
    let newPrice = getState().Ingds.totalPrice - itmPrice;
    dispatch({ type: UPDT_INGDS, value:{ total: newPrice, ingds: ingList } })
    dispatch(getPosArr(currIngds));
}

