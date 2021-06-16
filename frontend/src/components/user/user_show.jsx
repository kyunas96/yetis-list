import React from 'react';

class UserHomePage extends React.Component {
	render() {
		return (
			<div>
				<h1 className="main-title">Yeti's List</h1>
				<h1 className="user-greeting">{this.props.currentUser.username} Yeti friend!</h1>
				{/* {this.props.logout} */}
			</div>
		);
	}
}


export default UserHomePage