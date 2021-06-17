// NOT 
// BEING 
// USED 
// ANYWHERE
// AT 
// THE 
// MOMENT

import React from 'react';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';

class UserHomePage extends React.Component {
	render() {
		return (
			<div>
				<h1>Yeti's List</h1>
				<h1>Hello {this.props.currentUser.username}</h1>
			</div>
		);
	}
}

const mSTP = (state, ownProps) => {
	return {
		currentUser: state.entities.users
	};
};

const mDTP = (dispatch) => {
	return {
		logout: <button onClick={() => dispatch(logout())}>logout</button>,
	};
};

export default connect(mSTP, mDTP)(UserHomePage);
