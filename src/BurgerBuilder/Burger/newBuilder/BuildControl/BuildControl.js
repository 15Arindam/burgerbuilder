import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = (props) => {
    // console.log(props.ingds);
    return (
    // <div className={classes.btnwrap}>
    <div className={classes.btnstyle} 
        onClick={() => {props.additem(props.label+`~`+props.nositms,props.ingds)}}>{props.label}</div>
    // </div>
    )
}

export default BuildControl;