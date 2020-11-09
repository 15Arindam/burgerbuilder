import React from 'react';

import axios from '../../../backend/axios-instance';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import WaveBars from '../../../components/UI/LoadingAnimation/wavebars/wavebars';
import MyElement from '../../../components/UI/MyElement/MyElement';
import { updateObject, checkValidity } from '../../../components/shared/utility';

class ContactData extends React.Component{
    state = {
        fields: {
            name:{
                // label: 'First Name',
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Enter Name'
                },
                validation:{
                    required: true,
                    isChar: true
                },
                valid: true,
                touched: false,
                value: this.props.user? this.props.user : '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter email'
                },
                value: this.props.email? this.props.email : '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: true,
                touched: false
            },
            address: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Enter Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pin: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter pincode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
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
    submitHandler = e => {
        e.preventDefault();
        this.setState({ loading : true });
        // console.log('contact data state , props',this.state,this.props);
        const {email,name,address,pin} = this.state.fields;
        let orders = {};
        let Ingds = this.props.orders;
        for (let i in Ingds){
            // console.log('sub i in ingds',i)
            if(Ingds[i].length) { 
            // console.log('sub i in if ingds',i)
                orders[i] = Ingds[i].toString()
            }
        }
        const userData = { email: email.value, name: name.value, address: address.value, pin: pin.value };
        
        // console.log(this.props,this.props.price)
        axios.post('/orders.json',{orders, ...userData, price : this.props.price, date : Date.now(), userId: this.props.uid})
        .then(response => {
            this.setState({ loading : false });
            console.log(response.data);
        })
        .catch(error => {
            this.setState({ loading : false });
            console.log(error);
        })
        .then(() => {
            this.props.history.push('/orders');
        })
    }
    render(){
        const {fields} = this.state;
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
        return(
            !this.state.loading ? 
            <div className={classes.ContactData}>
                <h3>Enter Your Contact Data</h3>
                <div className={classes.Wrapper}>
                        <form className={classes.Login} onSubmit={this.submitHandler}>
                            {inputs}
                            <p className="text-center">
                                <button onClick={this.submitHandler} 
                                disabled={!this.state.formIsValid} 
                                className={"btn btn-primary"}>Order</button>
                            </p>
                        </form>
                </div>
            </div>: <WaveBars/>
        )
    }
}

const mapStateToProps = state =>{
    return {
        orders: state.Ingds.ingds,
        price: state.Ingds.totalPrice,
        uid: state.Auth.uid,
        user: state.Auth.name,
        email: state.Auth.email
    }
}
export default connect(mapStateToProps)(ContactData);