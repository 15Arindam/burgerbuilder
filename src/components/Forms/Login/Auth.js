import React from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import {checkValidity, updateObject} from '../../shared/utility';
import axiosDb,{authInst,AUTH_KEY} from '../../../backend/axios-instance';
import {setUser, toggleAuthForm, unsetUser, setRedirectPath, loginChecker} from '../../../store/actions/auth';
import MyElement from '../../UI/MyElement/MyElement';
import BlankHOC from '../../../Containers/BlankPage/blankpage';
import WaveBars from '../../UI/LoadingAnimation/wavebars/wavebars';
import classes from './Auth.module.css'
import { faAddressBook, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Loginform extends React.Component{
    state ={
        fields: this.props.fields,
        formIsValid: false,
        redirectTo: '',
        signUp : true,
        error : null,
        loader : localStorage.getItem('token')?this.props.loader:false,
        errMsg: '',
    }
    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFields = updateObject( this.state.fields, {
            [inputIdentifier]: updateObject( this.state.fields[inputIdentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.fields[inputIdentifier].validation ),
                touched: true
            } )
        } );
        let formIsValid = true;
        for (let inputIdentifier in updatedFields) {
            formIsValid = updatedFields[inputIdentifier].valid && formIsValid;
        }
        this.setState({fields: updatedFields, formIsValid: formIsValid});
        if(this.state.error){
            this.setState({error : null});
        }
    }
    toggleSignUpSignIn = () => {
        this.setState(prevState => ({
            ...prevState,
            signUp : !prevState.signUp,
            error: null
        }),() => this.props.fetchFields(this.state.signUp));
    }
    componentDidMount = () => {
        localStorage.getItem('token') && this.setState({ loader: this.props.loader });
    }
    componentDidUpdate = (prevProps) => {
        const J = x => JSON.stringify(x);

        if(!this.props.loader && prevProps.loader !== this.props.loader){
            this.setState({ loader: false })
        }
        if(J(this.props.fields) !== J(prevProps.fields)){
            this.setState({ fields: this.props.fields });
        }
        if( (this.props.hasBuilt !== prevProps.hasBuilt) && this.props.redirectTo ){
            this.props.setRedirectPath(null);
        }
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.setState({ loader : true });
        const {email,username,password} = this.state.fields;
        // this.props.login(email.value,username?username.value:null,password.value);
        const key = AUTH_KEY;
        let url = '';
        let uid = null;
        let signUpdata = null;
        url = this.state.signUp? 'accounts:signUp?key=' : 'accounts:signInWithPassword?key=';  
        if(this.state.signUp) signUpdata = {     // data for sign up
            email : email.value,
            username : username.value,
        };  
        authInst.post( url + key , { // for sign in/ sign up
                email: email.value,
                password : password.value
            })
            .then(res => {
                // console.log('response',res.data);
                uid = res.data.localId;
                localStorage.setItem('token',res.data.idToken);
                localStorage.setItem('expiryDate',Date.now()+3600000);
                // 
                this.setState({ loader : false }, () => {
                    if(this.state.signUp){  // create a user node on successful sign up 
                        // console.log('Signing up')
                        axiosDb.post(`/users/${uid}.json`,{...signUpdata})
                        .then(response => {  
                            // console.log('Sign up response',response);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                    this.props.setUser();
                    this.props.loggedIn();

                    if(this.props.redirectTo){
                        this.props.history.push(this.props.redirectTo);
                    }
                    else{
                        this.props.history.push('/');
                    }
                }); 
            })
            .catch(error => {
                console.log('error response',error);
                this.setState({ error : error.message, loader : false });
            })
    }
    render(){
        const choice =  this.state.signUp ?
        (<div className={classes.toggle}>
            Already have an account?
            <span onClick ={this.toggleSignUpSignIn}>&nbsp;Login</span>
        </div>) 
        : <div className={classes.toggle}>Don't have account?
            <span onClick ={this.toggleSignUpSignIn}>&nbsp;Register now!</span>
          </div>;

        const submitBtn =  this.state.signUp ? (<span>
            Register &nbsp;<FontAwesomeIcon icon={faAddressBook}/>
        </span>):(
            <span>
                Log In &nbsp;<FontAwesomeIcon icon={faSignInAlt}/>
            </span>
        );

        let err = null;
        const {error, fields} = this.state;
        if(error){
            err = error;
            err = err.replace(/_/g,' ');
        }
        const formElementsArray = [];
        for (let key in fields) {
            formElementsArray.push({
                id: key,
                config: fields[key]
            });
        }
        let inputs = formElementsArray.map(formElement => (
                        <MyElement 
                            key={formElement.id}
                            label={formElement.config.label}
                            elType={formElement.config.elementType}
                            elConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))
        return (
            !this.state.loader ? !this.props.checkuser ?
                <div className={classes.Wrapper}>
                        <form className={classes.Login} onSubmit={this.submitHandler}>
                            {this.state.error?<div className={classes.err}>{err}</div>:null}
                            {inputs}
                            <p className="text-center">
                                <button onClick={this.submitHandler} 
                                disabled={!this.state.formIsValid} 
                                className={"btn btn-primary"}>{submitBtn}</button>
                            </p>
                        </form>
                        {choice}
                </div>
            :<BlankHOC><h4>Hi! {this.props.user}</h4>You Are Logged In
                <button className={[classes.btnStyle,"btn btn-danger"].join(' ')} onClick={e=>this.props.logout(e)}>Logout</button>
            </BlankHOC> 
            :<BlankHOC><WaveBars/></BlankHOC>
        )
    }
}

const mapStateToProps = state => {
    return {
        fields: state.Auth.fields,
        checkuser: state.Auth.uid,
        loader: state.Auth.loading,
        redirectTo: state.Auth.redirectTo,
        hasBuilt: state.Ingds.totalPrice,
        user: state.Auth.name,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: () => dispatch(setUser()),
        fetchFields: (value) => dispatch(toggleAuthForm(value)),
        logout: (e) => dispatch(unsetUser(e)),
        loggedIn: () => dispatch(loginChecker()),
        setRedirectPath: (path) => dispatch(setRedirectPath(path))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Loginform));