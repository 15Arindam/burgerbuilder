import React from 'react';
import classes from './Builder.module.css';
import Controls from './BuildControl/BuildControl';
import PredefIngds from '../predefIngds/predefIngds';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';

const BuildControls = (props) => {
    
    // console.log(props.predefs);
    let controlList = Object.keys(props.itemsPrice).map((items,index) => {
        return <Controls label={items} key={items+index} 
        additem = {props.additm} ingds={props.ingdList}  nositms={props.posArr.length}/>
    });
    let itemsCount = props.posArr.length;
    
    return (
        <div className={classes.builder}>
            <h3><FontAwesomeIcon icon={faRupeeSign} transform="shrink-3"/> {props.sum}</h3>
            <div className={classes.Ingwrapper}>
                <div className={classes.separator}>
                    {/* <h3>#Make</h3> */}
                    {controlList}
                </div>
                <div className={classes.separator}>
                    {/* <h3>#Takeaway!</h3> */}
                    <PredefIngds predefs={props.predefs}/>
                </div>
            </div>
            <button disabled={itemsCount <= 0} onClick={props.clicked} className={classes.OrderButton}>{props.btnLabel}</button>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        posArr : state.Ingds.posArr
    }
}
export default connect(mapStateToProps)(BuildControls);