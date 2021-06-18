import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllPlaylists } from '../../actions/playlist_actions';
import { openModal } from '../../actions/modal_actions';
import SongListItem from '../song/song_list_item';
import './playlist_css/playlist-show-page.css'

class PlaylistShowPage extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!this.props.playlist && (nextProps.playlist !== this.props.playlist)) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const {title, description, comments, songs} = this.props.playlist ? this.props.playlist : {title: '', description: ''}
		return (
			<section className='current-playlist-show-page'>
				<section className='playlist-info'>
					<div className='playlist-header'>
						<div className='playlist-title'>{title}</div>
    		            <div className='playlist-description'>{description}</div>
					</div>
					<ul className='playlist-songs'>
						{songs.map((song, i) => {
							<SongListItem key={i} song={song}/>
						})}
					</ul>
				</section>
			</section>
		);
	}
}



const mSTP = (state, ownProps) => {
	return {
        playlist: state.entities.currentPlaylist,
	};
};

const mDTP = (dispatch) => {
	return {
		fetchAllPlaylists: () => dispatch(fetchAllPlaylists()),
		openModal: () => dispatch(openModal('add-comment'))
	};
};

export default withRouter(connect(mSTP, mDTP)(PlaylistShowPage));
