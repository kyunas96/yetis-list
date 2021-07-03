import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { removeSongFromPlaylist } from '../../actions/song_actions';
import { fetchPlaylists } from '../../actions/playlist_actions';

const SongListItem = ({ song, removeSongFromPlaylist, isUsersPlaylist, fetchPlaylists, userId }) => {
	console.log(song);
	
	if (song.artist) {
		song.artists = song.artist
		delete song.artist
	}

	let image = song.image ? song.image.small : ''

	return (
		<li className='song-item-show'>
			<img src={image} alt='Album Cover'/>
			<div>{song.artists[0]}</div>
			<div>{song.name}</div>
			{isUsersPlaylist ? (
				<button onClick={() => removeSongFromPlaylist(song).then(() => fetchPlaylists(userId))}>Remove Song</button>
			) : (
				<></>
			)}
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
	userId: state.session.user
});

const mDTP = (dispatch) => ({
	removeSongFromPlaylist: (song) => dispatch(removeSongFromPlaylist(song)),
	fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
});

export default withRouter(connect(mSTP, mDTP)(SongListItem));
