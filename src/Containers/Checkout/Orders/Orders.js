import React from 'react';
import WaveBars from '../../../components/UI/LoadingAnimation/wavebars/wavebars';
import  Order from '../../../components/Orders/Orders';
import classes from './Orders.module.css';
import { fetchOrders, deleteOrder } from '../../../store/actions/orders';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Orders extends React.Component{

    state={
        loading: true
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.userId && (this.props.userId !== prevProps.userId))
            this.props.fetchOrders(this.props.userId);
        if(!this.props.loading && (prevProps.loading !== this.props.loading)){
            this.setState({ loading: this.props.loading })
        }
    }
    componentDidMount = () => {
        if(this.props.userId && !this.props.orders.length)
            this.props.fetchOrders(this.props.userId);
        else if(this.props.orders.length){
            this.setState({ loading: this.props.loading })
        }
    }
        render(){
            let orderList = null ;
                orderList = this.props.orders.map((order,key)=>{
                    return <Order 
                        key={key} name={order.name}id={order.orderId} 
                        orders={order.orders} price={order.price} 
                        date={order.date} delete={this.props.deleteOrder}
                        />
                })             
        return(
            <div className={classes.Orders}>
                { this.state.loading? <WaveBars/> 
                    : this.props.orders.length ? orderList 
                        : this.props.userId ?<span>You have no Orders till date 
                            <Link to="/"> Built your Burger</Link></span>
                        :<span>Login to view your orders 
                            <Link to="/login">Login</Link>
                        </span> }
             </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.Orders.orders,
        loading: state.Orders.fetching,
        userId: state.Auth.uid
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (uid) => dispatch(fetchOrders(uid)),
        deleteOrder: (e,id) => dispatch(deleteOrder(e,id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);