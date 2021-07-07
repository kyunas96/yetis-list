import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	fetchAllPlaylists,
	createPlaylist,
	sendPlaylistId,
	fetchPlaylists,
} from '../../actions/playlist_actions';
import { openModal } from '../../actions/modal_actions';
import { removeAllItems } from '../../actions/search_actions';
import SongListItem from '../song/song_list_item';
<<<<<<< HEAD
import './playlist_css/playlist-show-page.css';
import PlayerWidget from '../player_widget/player_widget'

class PlaylistShowPage extends Component {
=======
import './playlist_css/current_playlist_show_page.css';
import SlidersContainer from '../sliders/sliders_container';
import { sendSeed } from '../../actions/search_actions';
import { throttle } from 'underscore';

class PlaylistShowPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seeds: props.playlist.playlist.seeds,
			options: {}
		}
		console.log(this.state);
		this.sliderToSeeds = this.sliderToSeeds.bind(this);
		this.sendSeeds = throttle(this.props.sendSeed.bind(this), 500);
		
	}

>>>>>>> 1f9e06f3ed05eba651ddefdbc18be4531b8d1f81
	shouldComponentUpdate(nextProps) {
		if (this.props !== nextProps) {
			return true;
		} else {
			return false;
		}
	}

	sliderToSeeds(options){
		this.setState({options}, () => {
			console.log(this.state)
			this.sendSeeds(this.state)
		})
	}

	componentWillUnmount() {
		this.props.removeAllItems();
	}

	formatTitleAndDescription(type, info) {
		if (type === 'title' && info.length > 20) {
			info = info.slice(0, 17) + '...';
		}
		
		if (type === 'description' && info.length > 52) {
			info = info.slice(0, 49) + '...';
		}

		return info;
	}

	render() {
		const { seedType, searchValue } = this.props.playlist.playlistDetails;
		let title = this.props.items[0] ? `${this.props.items[0].name}` : '';
		let description = `Playlist made with the ${seedType}: ${searchValue}`;
		title = this.formatTitleAndDescription('title', title);
		description = this.formatTitleAndDescription('description', description);

		let songs = this.props.items;
		let klassName = 'song-saved disabled';
		let buttonStatus = true
		if (this.props.savedItems.length > 0) {
			songs = this.props.savedItems;
			klassName = 'song-saved';
			buttonStatus = false
		} 
		
		const playlistToSave = {
			songs,
			title,
			description,
			userId: this.props.userId,
		};

		return (
<<<<<<< HEAD
			<section className='playlist-show-page'>
				<section className='playlist-info'>
					<div className='playlist-header'>
						<div className='playlist-title'>{title}</div>
						<div className='playlist-description'>{description}</div>
					</div>
					<div className='save-playlist'>
						<button className='save-whole-playlist-button'
							onClick={() =>
								this.props.createPlaylist(playlistToSave).then((playlist) => {
									this.props
										.fetchPlaylists(this.props.userId)
										.then((playlists) => {
											const playlist = playlists[0];
											this.props.sendPlaylistId(playlist._id);
											this.props.history.push(
												`/users/${this.props.userId}/playlist/${playlist._id}`
											);
										});
								})
							}
							>
							Save Whole Playlist
						</button>
						<button
							onClick={() => {
								this.props.createPlaylist(playlistToSave).then((playlist) => {
									this.props.sendPlaylistId(playlist._id);
									this.props.history.push(
										`/users/${this.props.userId}/playlist/${playlist._id}`
									);
								});
							}}
							className={klassName}
							disabled={buttonStatus}
							>
							Save Playlist With Selected Songs
						</button>
					</div>
				</section>
				<PlayerWidget/>
				<ul className='playlist-songs'>
=======
			<section className='current-page-playlist-info'>
				<div className='playlist-header'>
					<div className='playlist-title'>{title}</div>
					<div className='playlist-description'>{description}</div>
				</div>
				<div>
					<button
						onClick={() =>
							this.props.createPlaylist(playlistToSave).then((playlist) => {
								this.props
									.fetchPlaylists(this.props.userId)
									.then((playlists) => {
										const playlist = playlists[0];
										this.props.sendPlaylistId(playlist._id);
										this.props.history.push(
											`/users/${this.props.userId}/playlist/${playlist._id}`
										);
									});
							})
						}
						>
						Save Whole Playlist
					</button>
					<button
						onClick={() => {
							this.props.createPlaylist(playlistToSave).then((playlist) => {
								this.props.sendPlaylistId(playlist._id);
								this.props.history.push(
									`/users/${this.props.userId}/playlist/${playlist._id}`
								);
							});
						}}
						className={klassName}
						disabled={disabled}
						>
						Save Playlist With Selected Songs
					</button>
				</div>
				<SlidersContainer action={this.sliderToSeeds}/>
				<ul className='current-playlist-list'>
>>>>>>> 1f9e06f3ed05eba651ddefdbc18be4531b8d1f81
					{this.props.items.map((song, i) => {
						return (
							<SongListItem key={i} song={song} index={i}/>
						);
					})}
				</ul>
			</section>
		);
	}
}

const mSTP = (state, ownProps) => {
	return {
		playlist: state.entities.currentPlaylist,
		savedItems: state.entities.currentPlaylist.playlist.savedItems,
		items: state.entities.currentPlaylist.playlist.items,
		userId: state.session.user,
	};
};

const mDTP = (dispatch) => {
	return {
		fetchAllPlaylists: () => dispatch(fetchAllPlaylists()),
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
		createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
		sendPlaylistId: (playlistId) => dispatch(sendPlaylistId(playlistId)),
		openModal: () => dispatch(openModal('add-comment')),
		removeAllItems: () => dispatch(removeAllItems()),
		sendSeed: (seedData) => dispatch(sendSeed(seedData))
	};
};

export default withRouter(connect(mSTP, mDTP)(PlaylistShowPage));
