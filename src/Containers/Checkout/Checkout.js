import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import classes from './Checkout.module.css';

class Checkout extends React.Component{
    
    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    render(){
    return (
        <div className={classes.wrapper}>
            <CheckoutSummary
                posArr={this.props.posArr} 
                cancel={this.checkoutCancelHandler} 
                continue={this.checkoutContinueHandler}/>
            <Route path={this.props.match.url + '/contact-data'} render={(props) => (
            <ContactData {...props}/>
            )}/>
        </div>
    )    
    }
}

const mapStateToProps = state =>{
    return {
        posArr : state.Ingds.posArr
    }
}
export default connect(mapStateToProps)(Checkout);