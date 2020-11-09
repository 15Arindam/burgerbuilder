import React from 'react'
import classes from './Footer.module.css'
import FooterCont from './FooterContent/FooterContent'

const Footer = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Footer}>
                <FooterCont/>
            </div>
        </div>
    )
}

export default Footer;
