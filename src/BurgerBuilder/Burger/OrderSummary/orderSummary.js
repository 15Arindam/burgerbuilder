import React from 'react';
import Button from '../Button/Button';
import classes from './orderSummary.module.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';

const order = (props) => {
    let itemsSummary = props.posArr.map((item,index) => {
            // console.log(item,index);
        return (
            <li className={classes.listfont} key={index}>
                <i>Layer {props.posArr.length - index }:</i>
                <b> {item}</b>
            </li>)
     });
        return (
            <div className={classes.orderSummary}>
                <div><h4>Your Burger has the following ingredients</h4></div>
                <div><b>Total: </b><FontAwesomeIcon icon={faRupeeSign}/> {props.price}</div>
                    <div style={{ overflow: "auto", maxHeight: "200px" }}>
                        <ul>
                            {itemsSummary}
                        </ul>
                    </div>
                <p><i>Continue to checkout?</i></p>
                <div>
                    <Button btntype="Success" clicked={props.continue}>Continue</Button>
                    <Button btntype="Danger" clicked={props.cancel}>Cancel</Button>
                </div>
            </div>
        )
    }
const mapStateToProps = state =>{
    return {
        posArr : state.Ingds.posArr
    }
}
export default connect(mapStateToProps)(order);