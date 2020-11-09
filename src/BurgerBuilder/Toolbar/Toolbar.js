import React from 'react';
import Logo from '../../components/Logo/Logo';
import Navs from '../../components/Navigation/NavItems';
import Togdrawer from '../../components/Sidedrawer/Toggledrawer/Toggledrawer';
import classes from './Toolbar.module.css';

const Toolbar = (props) => {
    return (
        <header className={classes.toolbar}>
            <div className={classes.mobileOnly}>
                <Togdrawer clicked={props.toggle}>Menu</Togdrawer>
            </div>
            <Logo alt="Logo"/>
            <nav className={classes.desktopOnly}>
                <Navs/>
            </nav>
        </header>
    )
}


export default Toolbar;