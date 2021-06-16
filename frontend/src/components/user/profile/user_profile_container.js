import React from 'react';
import { logout } from '../../../actions/session_actions';
import { connect } from 'react-redux';
import UserProfilePage from './user_profile'

const mSTP = (state, ownProps) => {
	return {
		currentUser: state.entities.users
	};
};

const mDTP = (dispatch) => {
	return {
		logout: <button className="logout-button" onClick={() => dispatch(logout())}>logout</button>,
	};
};

export default connect(mSTP, mDTP)(UserProfilePage);
