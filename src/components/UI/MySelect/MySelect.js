import React from 'react';
import classes from './MySelect.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown,faAngleUp} from '@fortawesome/free-solid-svg-icons';

export default class MySelect extends React.Component{
    state={
        options: [],
        listToggle: false,
        listVal:'',
        multi: false,
        label: ''
    }
    listToggleHandler = () => {
        this.setState(prevState=>({ listToggle: !prevState.listToggle }));
    }
    componentDidUpdate = () => {
        if(this.props.multi !== this.state.multi){
            this.setState({ multi: this.props.multi })
        }
        if(this.props.value !== this.state.listVal){
            this.setState({ listVal: this.props.value });
        }
        if(JSON.stringify(this.props.options) !== JSON.stringify(this.state.options)){
            this.setState({ options: this.props.options });
        }
    }
    render(){
        let choice = this.props.label;
        if(this.props.multi){
            choice = this.props.value.length?this.props.value.map((val,i) => {
                return <span className={classes.spanstyle} key={i} 
                    onClick={e=>this.props.remvChoice(e,this.props.type,val)}>{val.value}</span>
            }):choice
        }
        else{
            choice = this.state.listVal?this.state.listVal:choice;
        }
        
        let method = this.props.listChanged;
        return(
            <div className={classes.wrapper}>
                <div onClick={this.listToggleHandler} className={classes.style} >{choice}
                    <FontAwesomeIcon
                        icon={this.state.listToggle?faAngleUp:faAngleDown} transform="grow-2" color="#bbb"/>
                </div>
                <div className={classes.ulWrapper}>
                    <ul className={classes.styleul} style={{ display: this.state.listToggle?'initial':'none'}}>
                        {this.state.options.map((opt,index) => {
                            // console.log(opt)
                            return <li key={opt.id} onClick={ e => 
                            this.props.multi?method(e,this.props.type,opt)
                                :method(e,this.props.type,opt).then(()=>this.listToggleHandler())}>
                                {opt.value}
                            </li>
                        })}
                    </ul>
                </div>  
            </div>
        )
    }
}