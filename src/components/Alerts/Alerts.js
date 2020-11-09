import React from 'react';
import {connect} from 'react-redux';
import classes from './Alert.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faInfoCircle, faQuestionCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const Alert = ({ alerts }) =>(
    alerts !== null && alerts.length > 0 && alerts.map(
        alert =>{
            let icon = null;
            switch(alert.type){
                case ('success'): 
                    icon = faCheckCircle;
                    break;
                case ('warning'):
                    icon = faExclamationTriangle;
                    break;
                case ('danger'):
                    icon = faExclamationCircle;
                    break;
                case ('info'):
                    icon = faInfoCircle;
                    break;
                default :
                    icon = faQuestionCircle;
                    break;
            }
            return(
                <div key={alert.id} className={classes.alert+` alert-${alert.type}`}>
                    {}
                    <FontAwesomeIcon icon={icon} transform="grow-3"/>&nbsp;
                    {alert.msg}
                </div>
            )
        }
    )
)

const mapStateToProps = state => {
    return { alerts: state.alerts }
}

export default connect(mapStateToProps,null)(Alert);