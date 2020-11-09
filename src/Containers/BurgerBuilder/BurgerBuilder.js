import React from 'react';

import ErrorHandler from '../../components/UI/HOC/ErrorHandler';
import axios from '../../backend/axios-instance';
import Burger from '../../BurgerBuilder/Burger/Burger';
import Builder from '../../BurgerBuilder/Burger/newBuilder/Builder';
import Modal from '../../BurgerBuilder/Burger/OrderModal/Modal';
import Ordersummary from '../../BurgerBuilder/Burger/OrderSummary/orderSummary';
import classes from './BurgerBuilder.module.css';
import WaveBars from '../../components/UI/LoadingAnimation/wavebars/wavebars';
import { connect } from 'react-redux';
import {getPosArr, UpdateItemsList, RemoveItemsList, AddItemsList, setIngds} from '../../store/actions/Ingds';
import { setRedirectPath } from '../../store/actions/auth';

class BurgerBuilder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ingredients : props.Ingds,
            ingredientsPrice : props.Price,
            defaultPrice : 7,
            loading : false,
            purchasing: false
        }
    }
    componentDidMount = () => {
        if(this.props.total === 7)
            this.props.getIngds();
    }
    componentDidUpdate = (prevProps) => {
        const J = (x) => (JSON.stringify(x));

        if(J(this.props.Ingds) !== J(prevProps.Ingds)){
            this.setState({ ingredients: this.props.Ingds });
        }
        if(J(this.props.Price) !== J(prevProps.Price)){
            this.setState({ ingredientsPrice: this.props.Price });
        }
    }
    orderNowHandler = () => {
        if(this.props.userId)
            this.setState({purchasing:true});
        else{
            this.props.setRedirectPath('/checkout');
            this.props.history.push('/login');
        }
    }
    ordercancelHandler = () => {
        this.setState({purchasing: false});
    }
    ordercontinueHandler = () => {
       this.props.history.push({
           pathname : '/checkout'
       })
    }
    predefIngdshandler = (ingds) => {
        let prices = Object.keys(ingds).map( item => {
            let quantity = ingds[item].length;
            let itemPrice = this.state.ingredientsPrice[item];
            return itemPrice*quantity;
        })
        let total = prices.reduce((a,b) => a+b,0) + this.state.defaultPrice;
        this.props.updtItems(total,ingds);
    }
    render(){
        const btnLabel = this.props.userId? 'Order Now!': 'Sign in to Order';
        let burger = <WaveBars/>;
        let burgerBuilder = <WaveBars/>;
        if( this.state.ingredients && this.state.ingredientsPrice ){

            let {ingredients} = this.state;
            
            burger = <Burger ingds={ingredients} delitm={this.props.remItems}/>;
            burgerBuilder = <Builder 
                itemsPrice={this.state.ingredientsPrice}
                sum={this.props.total}
                clicked={this.orderNowHandler}
                ingdList = {ingredients}
                predefs = {this.predefIngdshandler}
                additm={this.props.addItems}
                btnLabel={btnLabel} />;
        }
        let orderSummary = this.state.purchasing && <Ordersummary continue={this.ordercontinueHandler} cancel={this.ordercancelHandler} price = {this.props.total}/>;
        if( this.state.loading ){
            orderSummary = <WaveBars/>
        }
        return(
            <div className={classes.wrapper}>
                <Modal modalClose={this.ordercancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>   
                {burger}
                {burgerBuilder}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        Ingds: state.Ingds.ingds,
        Price: state.Ingds.price,
        total: state.Ingds.totalPrice,
        userId: state.Auth.uid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getIngds : () => dispatch(setIngds()),
        getPosArr: (val) => dispatch(getPosArr(val)),
        updtItems: (price,ingds) => dispatch(UpdateItemsList(price,ingds)),
        addItems: (pos,ingds) => dispatch(AddItemsList(pos,ingds)),
        remItems: (pos,ingds) => dispatch(RemoveItemsList(pos,ingds)),
        setRedirectPath: (path) => dispatch(setRedirectPath(path))
    }
}

export default ErrorHandler(connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder),axios);