import React from 'react';
import classes from './Orders.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faRupeeSign, faUser, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Orders = (props) => {
    // console.log(Date(props.data),typeof(Date(props.data)));
    let order = null;
    if(props.orders){
        order = Object.keys(props.orders).map(i => {
            return <li key={i}>{i?i+'('+props.orders[i]+')':''}</li>
        })
    }
    return(
        order?
            <div className={classes.Orders}>
                <div className={classes.info}>
                    <FontAwesomeIcon icon={faUser}/>{' '+props.name}&emsp;
                    <FontAwesomeIcon icon={faCalendarAlt}/>{' '+new Date(props.date).toLocaleDateString()}&emsp;
                    <FontAwesomeIcon icon={faRupeeSign}/>{' '+props.price}
                </div>
                <div>
                    <ul className={classes.list}>
                        {order}
                    </ul>
                    <FontAwesomeIcon className={classes.delete} icon={faTrashAlt} onClick={e=>props.delete(e,props.id)}/>
                </div>
                
            </div>
        :'...'
    )
}
export default Orders;