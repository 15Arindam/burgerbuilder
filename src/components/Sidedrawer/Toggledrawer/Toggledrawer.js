import React from 'react';
import classes from './Toggledrawer.module.css';

const togbtn = (props) => {
    return (
        <div className={classes.togdrawer} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
export default togbtn;