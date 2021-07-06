import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { saveItem, removeItem } from '../../actions/search_actions';
import { receiveSongId } from '../../actions/widget_actions';

class SongListItem extends Component {
	constructor(props) {
		super(props);
		this.toggleSaveItem = this.toggleSaveItem.bind(this);
		this.renderInitialWidget();
	}

	renderInitialWidget() {
		let { song, receiveSongId, index } = this.props;
		if (index === 0) {
			receiveSongId(song.id);
		}
	}

	toggleSongSelected(songId) {
		const checkbox = document.getElementById(`select-${songId}`);

		if (checkbox.classList[0] === 'not-selected') {
			checkbox.classList.remove('not-selected');
			checkbox.classList.add('selected');
			checkbox.src = 'https://image.flaticon.com/icons/png/512/60/60726.png';
		} else {
			checkbox.classList.remove('selected');
			checkbox.classList.add('not-selected');
			checkbox.src = 'https://image.flaticon.com/icons/png/512/61/61221.png';
		}
	}

	toggleSaveItem(song, savedItems) {
		this.toggleSongSelected(song.id);
		let shouldSave = true;

		savedItems.forEach((songItem) => {
			if (song.id === songItem.id) {
				this.props.removeItem(song);
				shouldSave = false;
			}
		});

		if (shouldSave) this.props.saveItem(song);
	}

	shouldComponentUpdate(nextProps) {
		console.log('hitting component should update-song list item');
		return true;
	}

	render() {
		const { song, savedItems, receiveSongId } = this.props;
		return (
            <li
                className='song-item-show'
                id={`${song.id}`}
                >
				<img id={`select-${song.id}`} className='not-selected' onClick={() => this.toggleSaveItem(song, savedItems)} height='20px' width='20px'
				src='https://image.flaticon.com/icons/png/512/61/61221.png' />
                <img className="song-album-cover" src={song.image.small} alt='Album Cover'/>

                <div className='song-item-info'>
                    <div>{song.name}</div>
                    <div className='song-item-artist'>{song.artists[0]}</div>
                </div>
                <img
                    className='spotify-image'
                    onClick={() => receiveSongId(song.id)}
                    height='50px'
                    width='50px'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png'
                />
            </li>
		);
	}
}

const mSTP = (state) => {
	return {
		savedItems: state.entities.currentPlaylist.playlist.savedItems,
	};
};

const mDTP = (dispatch) => {
	return {
		saveItem: (song) => dispatch(saveItem(song)),
		removeItem: (song) => dispatch(removeItem(song)),
		receiveSongId: (songId) => dispatch(receiveSongId(songId)),
	};
};

export default withRouter(connect(mSTP, mDTP)(SongListItem));
