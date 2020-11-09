import React from 'react';
import image from '../../assets/images/bglogo.png';
import classes from './Logo.module.css'
import { Link } from 'react-router-dom';

const logo = (props) => (
    <Link className={classes.logowrapper} to="/"><img className={classes.logo} src={image} alt={props.alt}/></Link>
)

export default logo;
