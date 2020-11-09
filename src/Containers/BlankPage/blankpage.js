import React from 'react';
import classes from './blankpage.module.css';

const BlankHOC = ({ children }) => (
    <div className={classes.wrapper}>
        {children}
    </div>
);

export default BlankHOC;