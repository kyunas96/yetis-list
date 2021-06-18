import React from 'react';
import { logout } from '../../../actions/session_actions';
import { connect } from 'react-redux';
import UserProfilePage from './user_profile'
import { fetchPlaylists } from '../../../actions/playlist_actions';
import { withRouter } from 'react-router';

const mSTP = (state, ownProps) => {
	return {
		currentUser: state.entities.users
	};
};

const mDTP = (dispatch) => {
	return {
		logout: <button className="logout-button" onClick={() => dispatch(logout())}>logout</button>,
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
	};
};

export default withRouter(connect(mSTP, mDTP)(UserProfilePage));
