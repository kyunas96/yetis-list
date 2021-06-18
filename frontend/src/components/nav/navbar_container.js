import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { openModal } from '../../actions/modal_actions';
import { fetchPlaylists } from '../../actions/playlist_actions';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';

const mapStateToProps = (state, ownProps) => {
	return {
		loggedIn: state.session.isAuthenticated,
		user: state.session.user,
	};
};

const mDTP = (dispatch) => {
	return {
    openModal: () => dispatch(openModal('create-playlist')),
	logout: () => dispatch(logout()),
	fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
	};
};

export default withRouter(connect(mapStateToProps, mDTP)(NavBar));
