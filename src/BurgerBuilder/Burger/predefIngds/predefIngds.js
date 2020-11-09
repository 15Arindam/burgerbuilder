import React from 'react';
import Predefs from './predefs/predefs';

const preIngds = (props) => {
        let readymade = [
            "Cheese Burger","Meat Burger", "Veg Burger", "Big Belly Burger", "Empty"
        ];
        let choices = readymade.map((type,index) => {
            // console.log(type);
            return <Predefs predefs={props.predefs} type={type} key={index}/>
        })
        return choices
}
export default preIngds;
