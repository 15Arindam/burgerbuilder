import React from 'react';
import classes from './MyElement.module.css';
import MySelect from '../MySelect/MySelect';

const MyElement = (props) => {
    let inputEl = null;
    let inputClasses = [classes.default];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch(props.elType){
        case ('input'):   inputEl = (
                                    <div>
                                        <div className="form-group">
                                         <label>{props.label?props.label:null}</label>
                                            <input className={'form-control '+inputClasses.join(' ')} 
                                            disabled={props.disabled} onChange={props.changed}
                                            value={props.value} {...props.elConfig}/>
                                        </div>
                                    </div>
                                    );
                                    break;
        case ('textarea'):   inputEl = (
                                <div>
                                    <div className="form-group">
                                        <label>{props.label?props.label:null}</label>
                                            <textarea className={'form-control '+inputClasses.join(' ')} 
                                            disabled={props.disabled} onChange={props.changed}
                                        value={props.value} {...props.elConfig}/>
                                    </div>
                                </div>
                                );
                                break;
        case ('select'): inputEl = <div className={props.class?props.class:"col-md-6"}>
                                        <label>{props.label?props.label:null}</label>
                                        <MySelect value = {props.value} listChanged={props.listChanged}  
                                            remvChoice={props.remvChoice} type={props.type}
                                            options={props.elConfig.options} multi={props.multi} />
                                    </div>
                                    break;

        case ('password'): inputEl = <div>
                                        <div className="form-group">
                                        <label>{props.label?props.label:null}</label>
                                        {/* <FontAwesomeIcon className={classes.icon} icon={faLock}/> */}
                                         {/* <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> */}
                                            <input className={'form-control '+inputClasses.join(' ')} 
                                            disabled={props.disabled} onChange={props.changed}
                                            value={props.value} {...props.elConfig}/>
                                        </div>
                                    </div>
                                     break;

        case ('file'): inputEl =    <div className={props.class?props.class:null}>
                                     <label>{props.label?props.label:null}</label>
                                        <div className='custom-file mb-4'>
                                            <input
                                                disabled={props.disabled}
                                                {...props.elConfig}
                                                className={'custom-file-input '+inputClasses.join(' ')}
                                                id='customFile'
                                                onChange={props.fileChanged}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                            {props.fileName}
                                            </label>
                                        </div>
                                    </div>
                                break;

    default : inputEl =     <div className="col-md-6">
                                <div className="form-group">
                                <label>{props.label?props.label:null}</label>
                                    <input disabled={props.disabled} className={inputClasses.join(' ')}
                                    onChange={props.changed}
                                    value={props.value} {...props.elConfig}/>
                                </div>
                            </div>
                            break;
    }
    return(
            inputEl
    )
}
export default MyElement;