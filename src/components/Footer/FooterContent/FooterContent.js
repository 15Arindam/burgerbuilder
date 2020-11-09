import React from 'react';
import {Link} from 'react-router-dom';
import classes from './FooterContent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook,faInstagram,faGooglePlus,faTwitter} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FooterCont = () => (
    <React.Fragment>
        <div id="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <h4 className={classes.headings}>Pages</h4>
                            <ul className={classes.ulStyle}>
                                <li><Link to="text.html">About us</Link></li>
                                <li><Link to="text.html">Terms and conditions</Link></li>
                                <li><Link to="faq.html">FAQ</Link></li>
                                <li><Link to="contact.html">Contact us</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className={classes.headings}>Top categories</h4>
                            <ul className={classes.ulStyle}>
                                <li><Link to="category.html">Category-1</Link></li>
                                <li><Link to="category.html">Category-2</Link></li>
                                <li><Link to="category.html">Category-3</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className={classes.headings}>Where to find us</h4>
                            <p><strong>Car Dealer Ltd.</strong><br />13/25 New Town<br />Kokata</p>
                            <hr className="d-block d-md-none" />
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className={classes.headings}>Stay in touch</h4>
                            <p className={classes.social}>
                                <Link to="#" className={classes.fb}><FontAwesomeIcon icon={faFacebook}/></Link>
                                <Link to="#" className={classes.tw}><FontAwesomeIcon icon={faTwitter}/></Link>
                                <Link to="#" className={classes.inst}><FontAwesomeIcon icon={faInstagram}/></Link>
                                <Link to="#" className={classes.gp}><FontAwesomeIcon icon={faGooglePlus}/></Link>
                                <Link to="#" className={classes.em}><FontAwesomeIcon icon={faEnvelope}/></Link>
                                </p>
                        </div>
                    </div>
                </div>
            </div>    
            <div id="copyright">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-6 mb-2 mb-lg-0">
                        <p className="text-center text-lg-left">Copyright © All rights reserved</p>
                    </div>
                    </div>
                </div>
            </div>
    </React.Fragment>
);

export default FooterCont;