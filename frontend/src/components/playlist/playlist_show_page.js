import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllPlaylists, fetchPlaylists, sendPlaylistId } from '../../actions/playlist_actions';
import { openModal } from '../../actions/modal_actions';
import CommentsList from '../comment/comments_list';
import './playlist_css/playlist-show-page.css'
import SearchBarPlaylistShowContainer from '../search/search_bar_playlist_show_container'
import SongPlaylistList from '../song/song_playlist_list'

class PlaylistShowPage extends Component {

	componentDidMount() {
		this.props.fetchAllPlaylists()
		this.props.fetchPlaylists(this.props.userId)
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('should-this', nextProps)
		
		if (nextProps !== this.props || this.props.playlist !== nextProps.playlist) {
			return true;
		} else {
			return false;
		}
	}

	handleUpdate(playlistId) {
		this.props.sendPlaylistId(playlistId);
		this.props.openModal('update-playlist');
	}

	render() {
		console.log('playlist-show', this.props.playlist)
		const {title, description, comments, songs, _id} = this.props.playlist.playlist ? this.props.playlist.playlist : {title: '', description: '', comments: [], songs: [], _id: null}
		if (songs.length > 0) { songs.forEach(song => song.playlistId = _id) }
		
		// console.log('show-page', comments)
		return (
			<section className='playlist-show-page'>
				<CommentsList comments={comments} openModal={() => this.props.openModal('add-comment')} />

				<section className='playlist-info'>
					<div className='playlist-header'>
						<div className='playlist-title'>{title}</div>
    		            <div className='playlist-description'>{description}</div>
						<div>
							<button onClick={() => this.handleUpdate(_id)}>
								Update Playlist
							</button>
							<button
								onClick={() => {
									this.props.openModal('delete-playlist');
									this.props.sendPlaylistId(_id);
								}}>
								Delete Playlist
							</button>
						</div>
					</div>

					{this.props.playlist.currentUsersPlaylist ? <SearchBarPlaylistShowContainer playlistId={_id}/> : <></>}

					<SongPlaylistList songs={songs} onChange={() => this.props.fetchPlaylists(this.props.userId)}/>
				</section>
			</section>
		);
	}
}


// looks in currently logged in users playlist first,
// if no match then looks in all playlist
const selectPlaylist = (allPlaylists, playlists, playlistId) => {
	let selectedPlaylist;

	playlists.forEach(playlist => {
		if (playlist._id === playlistId) {
			selectedPlaylist = playlist;
		}
	})

	if (selectedPlaylist) {
		return {playlist: selectedPlaylist, currentUsersPlaylist: true};
	} else {
		selectedPlaylist = allPlaylists[playlistId]
		return {playlist: selectedPlaylist, currentUsersPlaylist: false};
	}
}

const mSTP = (state, ownProps) => {
	// console.log(state)
	// console.log(ownProps)
	return {
		userId: state.session.user,
        playlist: selectPlaylist(
			state.entities.playlists.allPlaylists, 
			state.entities.playlists.playlists, 
			state.entities.playlists.id
		),
	};
};

const mDTP = (dispatch) => {
	return {
		fetchAllPlaylists: () => dispatch(fetchAllPlaylists()),
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
		openModal: (type) => dispatch(openModal(type)),
		sendPlaylistId: (playlistId) => dispatch(sendPlaylistId(playlistId)),
	};
};

export default withRouter(connect(mSTP, mDTP)(PlaylistShowPage));
