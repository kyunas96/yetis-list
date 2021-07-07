import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { removeSongFromPlaylist } from '../../actions/song_actions';
import { fetchPlaylists } from '../../actions/playlist_actions';
import { receiveSongId } from '../../actions/widget_actions';

const SongListItem = ({ song, removeSongFromPlaylist, isUsersPlaylist, fetchPlaylists, userId, receiveSongId, index }) => {
	console.log(song);
	
	if(index === 0) {
		receiveSongId(song.id)
	}

	if (song.artist) {
		song.artists = song.artist
		delete song.artist
	}

	if (song.name.length > 25) {
		song.name = song.name.slice(0, 23) + '...';
	} 
	
	if (song.artists[0].length > 20) {
		song.artists[0] = song.artists[0].slice(0, 17) + '...';
	}

	let image = song.image ? song.image.small : ''

	return (
		<li className='song-item-show'>
			<img className="song-album-cover" src={image} alt='Album Cover'/>
			<div className='song-item-info'>
				<div>{song.name}</div>
				<div className='song-item-artist'>{song.artists[0]}</div>
			</div>
			{isUsersPlaylist ? (
				<button 
				className="remove-button"
				onClick={() => removeSongFromPlaylist(song).then(() => fetchPlaylists(userId))}>
					Remove
				</button>
			) : (
				<></>
			)}
			<img className='spotify-image' onClick={() => receiveSongId(song.id)} src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png' />
		</li>
	);
};

const isUsersPlaylist = (playlists, playlistId) => {
	let isUsers = false;
	playlists.forEach(playlist => {
		if (playlist._id === playlistId) isUsers = true
	})

	return isUsers;
}

const mSTP = (state, ownProps) => ({
	isUsersPlaylist: isUsersPlaylist(state.entities.playlists.playlists, ownProps.match.params.playlistId),
	userId: state.session.user,
});

const mDTP = (dispatch) => ({
	removeSongFromPlaylist: (song) => dispatch(removeSongFromPlaylist(song)),
	fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
	receiveSongId: (songId) => dispatch(receiveSongId(songId))
});

export default withRouter(connect(mSTP, mDTP)(SongListItem));
