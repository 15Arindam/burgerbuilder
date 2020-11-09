import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './Navs.module.css';

const navs = (props) => {

    return (
    <li className={classes.Navs}>
        <NavLink exact={props.active?true:false} activeClassName={classes.active} to={props.link}>{props.children}</NavLink>
    </li>
    )
}
export default navs;