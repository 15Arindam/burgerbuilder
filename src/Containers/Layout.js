import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Burger from './BurgerBuilder/BurgerBuilder';
import Toolbar from '../BurgerBuilder/Toolbar/Toolbar';
import Sidedrawer from '../components/Sidedrawer/Sidedrawer';
import Checkout from './Checkout/Checkout';
import Orders from './Checkout/Orders/Orders';
import Alert from '../components/Alerts/Alerts';
// import Footer from '../components/Footer/Footer';
import Auth from '../components/Forms/Login/Auth';
import ErrorPage from './ErrorPage/errorPage';

export default class PageWrapper extends React.Component{
    state = {
        showDrawer : false,
    }
    sidedrawerclosefunc = () => {
        this.setState({showDrawer : false});
    }
    sidedrawertogglefunc = () => {
        this.setState(prevState => ({showDrawer : !prevState.showDrawer}));
    }
    handleBackdropAtWindowResize = () => {
        let winHt = window.innerHeight;
        let winWd = window.innerWidth;
        // console.log(winWd,winHt);
        if(winHt < 420 && winWd > 600 && this.state.showDrawer){
            // console.log('condition met');
            this.setState(prevState => ({showDrawer : !prevState.showDrawer}));
        }
    }
    componentDidMount = () => {
        window.addEventListener("resize",this.handleBackdropAtWindowResize);
    }
    UNSAFE_componentWillMount = () => {
        window.removeEventListener("resize",this.handleBackdropAtWindowResize);
    }
    render(){
        
        return(
            <div style={{ marginTop : '80px' }}>
                <Router>
                    <Alert/>
                    <Toolbar toggle = {this.sidedrawertogglefunc}/>
                    <Sidedrawer 
                    draw={this.state.showDrawer} 
                    // toggle = {this.sidedrawertogglefunc}
                    close={this.sidedrawerclosefunc}/>
                    <Switch>
                        <Route path="/" exact component={Burger}/>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/orders" component={Orders}/>
                        <Route path="/login" component={Auth}/>
                        <Route component={ErrorPage}/>
                    </Switch>
                    {/* <Footer/> */}
                </Router>
            </div>
        );
    }
}