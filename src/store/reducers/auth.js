import {SIGN_UP, SET_USER, UNSET_USER, SET_REDIRECT, LOGGED_IN} from '../actionTypes';

const initialState = {
    fields: {
        username:{
            // label: 'First Name',
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder: 'Enter a Username'
            },
            validation:{
                required: true,
                isChar: true
            },
            valid: false,
            touched: false,
            value: '',
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter email '
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'password',
            elementConfig: {
                type: 'password',
                placeholder: 'Enter Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    },
    uid: null,
    name: null,
    email: null,
    loading: true,
    signUp: true,
    loggedIn: false,
    error: null,
    redirectTo: null
}

const mode = (state = initialState, action) => {
    const {type, value} = action;
    switch(type){
        case SIGN_UP : 
            if(value)
                return {
                    ...state,
                    signUp: true,
                    fields: initialState.fields
                }
            else{
                return{
                    ...state,
                    signUp: false,
                    fields: {
                        email: state.fields.email, password: state.fields.password
                    }
                }
            }
        case SET_USER:
            return{
                ...state,
                uid: value.uid,
                name: value.name,
                email: value.email,
                signUp: false,
                loading: false
            }
        case UNSET_USER:
            return{
                ...state,
                uid: null,
                name: null,
                email: null
            }
        case SET_REDIRECT:
            return{
                ...state,
                redirectTo: value
            }
        case LOGGED_IN:
            return {
                ...state,
                loggedIn: true
            }
        default:
            return{
                ...state
            }
    }
}

export default mode;