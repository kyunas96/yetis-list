import React from 'react';
import { logout } from '../../../actions/session_actions';
import { connect } from 'react-redux';
import UserHomePage from './user_main';

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

export default connect(mSTP, mDTP)(UserHomePage);