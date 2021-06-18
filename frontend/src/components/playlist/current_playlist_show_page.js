import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllPlaylists } from '../../actions/playlist_actions';
import { openModal } from '../../actions/modal_actions';
import SongListItem from '../song/song_list_item';
import './playlist_css/current_playlist_show_page.css'

class PlaylistShowPage extends Component {
	constructor(props) {
		super(props);
		console.log(this.props)
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (!this.props.playlist && (nextProps.playlist !== this.props.playlist)) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	render() {
		const items = this.props.playlist.items
		return (
			<section className='current-playlist'>
				<section className='playlist-info'>
					<div className='playlist-header'>
						<div className='playlist-title'>{items[0].name}</div>
    		            <div className='playlist-description'>I can't believe how cool this playlist is!</div>
					</div>
					<ul className='playlist-list'>
						{items.map((song, i) => {
							return <SongListItem className='playlist-item' key={i} song={song}/>
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
