import React from 'react';
import Modal from '../../../BurgerBuilder/Burger/OrderModal/Modal';

const ErrorHandler = (WrappedComponent,axios) => {
    return class extends React.Component{
        state = {
            error : null
        }
        componentDidMount = () => {
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error : error});
            });
            axios.interceptors.request.use(req => {
                if(this.state.error){
                    this.setState({ error: null });
                }
                return req;
            })
        }
        errorConfirmHandler = () => {
            this.setState({ error : null});
        }
        render(){
            return (
                <React.Fragment>
                    <Modal show={this.state.error} modalClose={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        }
    }
}

export default ErrorHandler;