import { connect } from 'react-redux';
import React from 'react';
import {
	fetchAllPlaylists,
	sendPlaylistId,
} from '../../actions/playlist_actions';
import { withRouter, Link } from 'react-router-dom';
import './playlist_css/playlist-feed.css';
import PlaylistFeedList from './playlist_feed_list';

class PlaylistFeedPage extends React.Component {
	constructor(props) {
		super(props);
		const playlists = this.filterOutOwnPlaylists(this.props.playlists);
		this.state = { playlists };
	}

	componentDidMount() {
		this.props.fetchAllPlaylists();
	}

	filterOutOwnPlaylists(playlists) {
		const otherPlaylists = [];

		for (const [key, playlist] of Object.entries(playlists)) {
			if (playlist.userId !== this.props.currentUserId) {
				otherPlaylists.push(playlist);
			}
		}

		return otherPlaylists;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			(!this.state.playlists && nextState.playlists !== this.state.playlists) ||
			nextProps !== this.props
		) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		return (
			<section className='playlist-feed-page'>
				<div className='feed-header'>
					<Link
						className='view-your-playlists'
						to={`/users/${this.props.currentUserId}/profile`}>
						View All Of Your Playlists
					</Link>
					<h2 className='view-playlist-text'>Select A Playlist Below To View</h2>
					<div className='description-text'>
						<h2>Playlist Title</h2>
						<h2>Created By</h2>
						<h2>Playlist Description</h2>
					</div>
				</div>
				<PlaylistFeedList
					playlists={this.state.playlists}
					currentUserId={this.props.currentUserId}
					sendPlaylistId={this.props.sendPlaylistId}
				/>
			</section>
		);
	}
}

const mSTP = (state, ownProps) => {
	return {
		playlists: Object.values(state.entities.playlists.allPlaylists),
		currentUserId: state.session.user,
	};
};

const mDTP = (dispatch) => {
	return {
		fetchAllPlaylists: () => dispatch(fetchAllPlaylists()),
		sendPlaylistId: (playlistId) => dispatch(sendPlaylistId(playlistId)),
	};
};

export default withRouter(connect(mSTP, mDTP)(PlaylistFeedPage));
