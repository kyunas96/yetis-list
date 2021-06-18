import React from 'react';
import './footer.css';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='creators-container'>
				<div>Project Members:</div>
					{/* <div className='creator-container'>
						<a href='https://github.com/yunasty' className='creator'><img src='https://image.flaticon.com/icons/png/128/4019/4019287.png'/></a>
						<div>Kevin Yunas</div>
					</div>
					<div className='creator-container'>
						<a href='https://github.com/brcodington78' className='creator'><img src='https://image.flaticon.com/icons/png/128/834/834358.png'/></a>
					</div>
					<div className='creator-container'>
						<a href='https://github.com/ElijahAlly' className='creator'><img src='https://image.flaticon.com/icons/png/128/4019/4019287.png'/></a>
					</div>
					<div className='creator-container'>
						<a href="https://github.com/Schploink" className='creator'><img src='https://image.flaticon.com/icons/png/128/834/834358.png'/></a>
					</div> */}
				<a href='https://github.com/yunasty' className='creator'><img src='https://image.flaticon.com/icons/png/128/4019/4019287.png'/></a>
				<a href='https://github.com/brcodington78' className='creator'><img src='https://image.flaticon.com/icons/png/128/834/834358.png'/></a>
				<a href='https://github.com/ElijahAlly' className='creator'><img src='https://image.flaticon.com/icons/png/128/4019/4019287.png'/></a>
				<a href="https://github.com/Schploink" className='creator'><img src='https://image.flaticon.com/icons/png/128/834/834358.png'/></a>
			</div>
		</footer>
	);
};


export default Footer;
