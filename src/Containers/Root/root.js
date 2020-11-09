import React from 'react';
import Layout from '../Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import {setUser} from '../../store/actions/auth';
import { setAlert } from '../../store/actions/alerts';

class Root extends React.Component{
    componentDidMount = () => {
        if(localStorage.getItem('token') && !this.props.checkuser)
            this.props.setUser();
        if(this.props.user && this.props.hasLoggedIn)
            this.welcomeUser();
    }
    welcomeUser = () => {
        this.props.setAlert(`Welcome ${this.props.user}`,'success');
    }
    componentDidUpdate = (prevProps) => {
        if(this.props.hasLoggedIn && ( prevProps.user !== this.props.user)){
            this.welcomeUser();
        }
    }
    render(){
        return <Layout/>
    }
}

const mapStateToProps = state => {
    return {
        checkuser: state.Auth.uid,
        hasLoggedIn: state.Auth.loggedIn,
        user: state.Auth.name
    };
}
const mapDispatchToProps = dispatch => {
    return {
        setUser: () => dispatch(setUser()),
        setAlert: (msg,type) => dispatch(setAlert(msg,type))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Root);