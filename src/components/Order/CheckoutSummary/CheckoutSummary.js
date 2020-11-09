import React from 'react';

import Burger from '../../../BurgerBuilder/Burger/Burger';
import classes from './CheckoutSummary.module.css';
import { Redirect } from 'react-router-dom';

const CheckoutSummary = (props) => {
    if(!props.posArr.length) return <Redirect to="/"/> 
    else
    return (
        <div className={classes.CheckoutSummary}>
            <h1>{!props.posArr.length?'Oops!':'We Hope it Tastes Well!'}</h1>
            <div className={classes.Wrapper}>
                <Burger btnDisable={true}/>
            </div>
            <div className={classes.btnWrapper}>
                <button className="btn btn-danger" onClick={props.cancel}>Cancel</button>
                <button className="btn btn-success" disabled={!props.posArr.length} onClick={props.continue}>Confirm</button>
            </div>
        </div>
    )
}
export default CheckoutSummary;