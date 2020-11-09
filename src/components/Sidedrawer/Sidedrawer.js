import React from 'react';
import Logo from '../Logo/Logo';
import Navs from '../Navigation/NavItems';
import Backdrop from '../../BurgerBuilder/Burger/OrderModal/Backdrop/Backdop';
import classes from './Sidedrawer.module.css';

const sidedrawer = (props) => {
    let sidedrawerclasses = [classes.Sidedrawer,classes.Close];
    if(props.draw){
        sidedrawerclasses = [classes.Sidedrawer,classes.Open];
    }
    return(
    <React.Fragment>
        <Backdrop show={props.draw} clicked={props.close}/>
        <div className={sidedrawerclasses.join(' ')} onClick={props.close}>
            <div className={classes.Logo}>
                {/* <Togdrawer clicked={props.toggle}>$</Togdrawer> */}
                <Logo/>
            </div>
            <nav className={classes.navStyle}>
                <Navs/>
            </nav>
        </div>
    </React.Fragment>
    )
}

export default sidedrawer;