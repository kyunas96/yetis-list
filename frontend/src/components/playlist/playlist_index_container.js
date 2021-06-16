import { connect } from 'react-redux';
import React from 'react';
import { openModal } from '../../actions/modal_actions';
import {
	fetchPlaylists,
	sendPlaylistId,
	deletePlaylist,
} from '../../actions/playlist_actions';
import { withRouter } from 'react-router';

class PlaylistIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleUpdate(playlistId) {
		this.props.sendPlaylistId(playlistId);
		this.props.openModal('update-playlist')
	}

	componentDidMount() {
		this.props.fetchPlaylists(this.props.currentUserId);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps !== this.props) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		return (
			<section>
          <button onClick={() => this.props.openModal('create-playlist')}>
            Make A Playlist
          </button>
          <br />
          <br />
				<ul>
					{this.props.playlists.length > 0 ? (
						this.props.playlists.map((playlist, i) => {
							return (
								<li key={i} playlist={playlist}>
									<h3>{playlist.title}</h3>
									<h3>{playlist.description}</h3>
									<button onClick={() => this.handleUpdate(playlist._id)}>
										Update Playlist
									</button>
									<button
										onClick={() => this.props.deletePlaylist(playlist._id).then(() => this.props.fetchPlaylists(playlist.userId))}>
										Delete Playlist
									</button>
									<br />
									<br />
								</li>
							);
						})
					) : (
						<li>
							<h3>You don't have any playlists</h3>
							<br />
						</li>
					)}
				</ul>
			</section>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		playlists: state.entities.playlists.playlists,
		currentUserId: state.session.user,
		playlistId: state.entities.playlists.id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
		sendPlaylistId: (playlistId) => dispatch(sendPlaylistId(playlistId)),
		deletePlaylist: (playlistId) => dispatch(deletePlaylist(playlistId)),
		openModal: (type) => dispatch(openModal(type)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PlaylistIndex)
);
