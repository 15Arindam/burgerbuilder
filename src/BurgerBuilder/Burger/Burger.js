import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.module.css';
import { connect } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const Burger = (props) => {
    let ingredientsUsed = props.posArr.map((ingd,index) => {
        return (
        <div className={classes.layer} key={index}>
            {props.btnDisable?<div style={{flex:'9%'}}></div>
            :<FontAwesomeIcon icon={faMinusCircle}
                className={classes.delbtnStyle}
                onClick={() => {props.delitm(ingd+`~`+index,props.ingds)}}/>}
            <div className={classes.outer}><BurgerIngredient type={ingd}/></div>
        </div>)
    });

    return(
        <div className={classes.burger}>
            <BurgerIngredient type={'bread-top'}/>
            {ingredientsUsed.length && !props.checkout?ingredientsUsed:<div>{props.btnDisable?'Your Burger is Empty':'Start Adding Ingredients'}</div>}
            <BurgerIngredient type={'bread-bottom'}/>
        </div>
    );
}

const mapStateToProps = state =>{
    return {
        posArr : state.Ingds.posArr
    }
}
export default connect(mapStateToProps)(Burger);