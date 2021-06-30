import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom'

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer-right-side'>
				<Link to='/contactUs' className='footer-a' className='contact-us-link'>Contact Us</Link> 
				<a className='footer-a' href='https://github.com/yunasty/yetis-list'><img className='github-icon' alt='link to our github' src='http://experience-premier.herokuapp.com/images/github-logo.ef7a02b69836dc8b6a732a54c4200dcb.png'></img></a>
			</div>
		</footer>
	);
};


export default Footer;
