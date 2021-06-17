import { connect } from 'react-redux';
import React from 'react';
import { openModal } from '../../actions/modal_actions';
import { fetchPlaylists } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';
// import SearchBarContainer from '../search_bar_container'
import './playlist_css/playlist-create-page.css';

class PlaylistCreatePage extends React.Component {
	componentWillUnmount() {
		this.props.fetchPlaylists(this.props.currentUserId);
	}

	render() {
		return (
			<section className='playlist-create-page'>
				<div>
					{/* <SearchBarContainer /> */}

					<input value='test search bar' />
					<button
						className='make-playlist-button'
						onClick={() => this.props.openModal('create-playlist')}>
						Make A Playlist From Scratch
					</button>
				</div>
			</section>
		);
	}
}

const mDTP = (dispatch) => {
	return {
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
		openModal: (type) => dispatch(openModal(type)),
	};
};

export default withRouter(connect(null, mDTP)(PlaylistCreatePage));
