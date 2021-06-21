import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { removeSongFromPlaylist } from '../../actions/song_actions';

const SongListItem = ({ song, removeSongFromPlaylist, isUsersPlaylist }) => {
	console.log(isUsersPlaylist);
	
	if (song.artist) {
		song.artists = song.artist
		delete song.artist
	}

	return (
		<li className='song-item-show'>
			<img src={song.image.small} />
			<div>{song.artists[0]}</div>
			<div>{song.name}</div>
			{isUsersPlaylist ? (
				<button onClick={() => removeSongFromPlaylist(song)}>Remove Song</button>
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
	isUsersPlaylist: isUsersPlaylist(state.entities.playlists.playlists, ownProps.match.params.playlistId)
});

const mDTP = (dispatch) => ({
	removeSongFromPlaylist: (song) => dispatch(removeSongFromPlaylist(song)),
});

export default withRouter(connect(mSTP, mDTP)(SongListItem));
