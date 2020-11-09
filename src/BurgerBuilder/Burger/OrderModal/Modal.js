import React from 'react';
import Backdrop from './Backdrop/Backdop';
import classes from './Modal.module.css';

const Modal = (props) => {
    return(
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClose}/>
            <div className={classes.Modal}
            style={{
                transform: props.show?`translateY(0)`:`translateY(-100vh)`,
                opacity: props.show? `1`:`0`
            }}>
            {props.children}
            </div>
        </React.Fragment>
    )
}

export default Modal;