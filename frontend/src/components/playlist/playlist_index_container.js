import { connect } from 'react-redux';
import React from 'react';
import { openModal } from '../../actions/modal_actions';
import {
	fetchPlaylists,
	sendPlaylistId,
	deletePlaylist,
} from '../../actions/playlist_actions';
import { withRouter, Link } from 'react-router-dom';

class PlaylistIndex extends React.Component {
	constructor(props) {
		super(props);
	}

	handleUpdate(playlistId) {
		this.props.sendPlaylistId(playlistId);
		this.props.openModal('update-playlist');
	}

	componentDidMount() {
		this.props.fetchPlaylists(this.props.currentUserId);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.playlists !== this.props.playlists) {
			return true;
		} else {
			return false;
		}
	}

	formatTitleAndDescription(type, info) {
		if (type === 'title' && info.length > 15) {
			info = info.slice(0, 14) + '...';
		}
		
		if (type === 'description' && info.length > 60) {
			info = info.slice(0, 57) + '...';
		}

		return info;
	}

	render() {
		return (
			<section className='playlist-list'>
				<button
					id='make-a-playlist'
					onClick={() => this.props.openModal('create-playlist')}>
					Make A Playlist From Scratch
				</button>
				<h2>Your Playlists</h2>
				<ul>
					{this.props.playlists.length > 0 ? (
						this.props.playlists.map((playlist, i) => {
							return (
								<li key={i} playlist={playlist} className='playlist-item'>
									<Link
										to={`/users/${this.props.currentUserId}/playlist/${playlist._id}`}
										onClick={() => this.props.sendPlaylistId(playlist._id)}>
										<h3 className='playlist-profile-title'>{this.formatTitleAndDescription('title', playlist.title)}</h3>
										<h3 className='playlist-profile-description'>
											{this.formatTitleAndDescription('description', playlist.description)}
										</h3>
									</Link>
									<button onClick={() => this.handleUpdate(playlist._id)}>
										Rename Playlist
									</button>
									<button
										onClick={() => {
											this.props.openModal('delete-playlist');
											this.props.sendPlaylistId(playlist._id);
										}}>
										Delete Playlist
									</button>
								</li>
							);
						})
					) : (
						<li>
							<h3>You don't have any playlists</h3>
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
