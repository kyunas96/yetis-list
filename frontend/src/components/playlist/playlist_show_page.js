import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllPlaylists, fetchPlaylists } from '../../actions/playlist_actions';
import { openModal } from '../../actions/modal_actions';
import CommentsList from '../comment/comments_list';
import './playlist_css/playlist-show-page.css'
import SearchBarPlaylistShowContainer from './search_bar_playlist_show_container'
import SongPlaylistList from '../song/song_playlist_list'

class PlaylistShowPage extends Component {

	componentDidMount() {
		this.props.fetchAllPlaylists()
		this.props.fetchPlaylists(this.props.currentUser.id)
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('should-this', this.props)
		
		if (!this.props.playlist.playlist && (nextProps.playlist.playlist !== this.props.playlist.playlist)) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		console.log('playlist-show', this.props.playlist)
		const {title, description, comments, songs, _id} = this.props.playlist.playlist ? this.props.playlist.playlist : {title: '', description: '', comments: [], songs: [], _id: null}
		return (
			<section className='playlist-show-page'>
				<CommentsList comments={comments} openModal={this.props.openModal} />

				<section className='playlist-info'>
					<div className='playlist-header'>
						<div className='playlist-title'>{title}</div>
    		            <div className='playlist-description'>{description}</div>
					</div>

					{this.props.playlist.currentUsersPlaylist ? <SearchBarPlaylistShowContainer playlistId={_id}/> : <></>}

					<SongPlaylistList songs={songs}/>
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
	console.log(state)
	console.log(ownProps)
	return {
		currentUser: state.entities.users,
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
		openModal: () => dispatch(openModal('add-comment')),
	};
};

export default withRouter(connect(mSTP, mDTP)(PlaylistShowPage));
