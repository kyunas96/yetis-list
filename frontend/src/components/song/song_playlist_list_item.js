import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { removeSongFromPlaylist } from '../../actions/song_actions';

const SongListItem = ({ song, removeSongFromPlaylist }) => {
	console.log(song);
	
	if (song.artist) {
		song.artists = song.artist
		delete song.artist
	}

	return (
		<li className='song-item-show'>
			<img src={song.image.small} />
			<div>{song.artists[0]}</div>
			<div>{song.name}</div>
			<button onClick={() => removeSongFromPlaylist(song)}>Remove Song</button>
		</li>
	);
};

const mDTP = (dispatch) => ({
	removeSongFromPlaylist: (song) => dispatch(removeSongFromPlaylist(song)),
});

export default withRouter(connect(null, mDTP)(SongListItem));
