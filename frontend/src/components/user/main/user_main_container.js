import React from 'react';
import { logout } from '../../../actions/session_actions';
import { connect } from 'react-redux';
import UserMainPage from './user_main';
import { fetchAllPlaylists } from '../../../actions/playlist_actions';
import { removeAllItems } from '../../../actions/search_actions';
import { withRouter } from 'react-router';

const mSTP = (state, ownProps) => {
	return {
		currentUser: state.entities.users
	};
};

const mDTP = (dispatch) => {
	return {
		logout: <button className="logout-button" onClick={() => dispatch(logout())}>logout</button>,
		fetchAllPlaylists: () => dispatch(fetchAllPlaylists()),
		removeAllItems: () => dispatch(removeAllItems())
	};
};

export default withRouter(connect(mSTP, mDTP)(UserMainPage));