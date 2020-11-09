import React from 'react';
import Navs from './Navs/Navs';
import classes from './Navitems.module.css';
import { connect } from 'react-redux';

const navitems = ({isUser}) => (
    <ul className={classes.navitems}>
        <Navs link="/" active>Burger Builder</Navs>
        {isUser ? <Navs link="/orders" active>Orders</Navs> : null}
        <Navs link="/login">{ isUser? 'Logout' : 'Login'}</Navs>
    </ul>
)

const mapStateToProps = state => {
    return {
        isUser: state.Auth.uid
    };
}
export default connect(mapStateToProps)(navitems);