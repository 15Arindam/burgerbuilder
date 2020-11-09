import React from 'react';
import classes from '../../newBuilder/BuildControl/BuildControl.module.css';

const predefs = (props) => {
    
    const ingds = {
        'empty' : {
            salad: [],
            cheese: [],
            meat: [],
            bacon: []
        },
        'cheese-Burger' : {
            salad: [1],
            cheese: [0,2],
            meat: [],
            bacon: []
        },
        "meat-Burger" : {
            salad: [3],
            cheese: [2],
            meat: [1],
            bacon: [0]
        },
        "veg-Burger" : {
            salad: [0,3],
            cheese: [1],
            meat: [],
            bacon: [2]
        },
        "Big-Belly-Burger" : {
            salad: [1],
            cheese: [0,5],
            meat: [2,4],
            bacon: [3]
        }
    }
        let type = null;
        switch( props.type ){
            case ('Cheese Burger'):
                    type = ingds["cheese-Burger"];
                    break;
            case ('Veg Burger'):
                    type = ingds["veg-Burger"];
                    break;
            case ('Big Belly Burger'): 
                    type = ingds["Big-Belly-Burger"];
                    break;
            case ('Meat Burger'):
                    type = ingds["meat-Burger"];
                    break;
            case ('Empty'):
                    type = ingds["empty"];
                    break;
            default :
                    type = null;
                    break;
        }
            return (
                <div className={classes.btnstyle} 
                    onClick={() => {props.predefs(type)}}>
                {props.type}</div>       
            )      
}

export default predefs;