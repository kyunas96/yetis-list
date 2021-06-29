import React from 'react';
import './footer.css';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer-right-side'>
				<a className='footer-a' className='contact-us-link' href="url">Contact Us</a> 
				<a className='footer-a' href='https://github.com/yunasty/yetis-list/wiki'><img className='github-icon' alt='link to our github' src='http://experience-premier.herokuapp.com/images/github-logo.ef7a02b69836dc8b6a732a54c4200dcb.png'></img></a>
			</div>
			
		</footer>
	);
};


export default Footer;
