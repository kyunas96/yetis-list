import { connect } from 'react-redux';
import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { createPlaylist, fetchPlaylists, sendPlaylistId } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';
import './playlist_css/create-playlist-modal.css'

class CreatePlaylist extends React.Component {
	constructor(props) {
		super(props);
		const user = this.props.currentUser;
		this.state = {
			userId: user.id,
			title: '',
			description: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getPlaylistNumber = this.getPlaylistNumber.bind(this);
	}

	componentDidMount() {
		this.props.fetchPlaylists(this.props.currentUser.id);
	}

	update(field) {
		return (e) =>
			this.setState({
				[field]: e.currentTarget.value,
			});
	}

	getPlaylistNumber() {
		if (!this.props.playlists) {
			return 1
		} else{
			const length = this.props.playlists.length + 1
			return length;
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const newState = Object.assign({}, this.state);
		if (newState.description.length < 1) {
			newState.description = `Playlist #${this.getPlaylistNumber()} for ${this.props.currentUser.username}`
		} 
		
		this.props.createPlaylist(newState)
		.then((playlist) => {
			this.props.sendPlaylistId(playlist._id);
			this.props.fetchPlaylists(playlist.userId).then(() => {
				this.props.history.push(`/users/${playlist.userId}/playlist/${playlist._id}`);
				this.props.closeModal();
			});
		});
	}

	render() {
		return (
			<div className='create-playlist-form-container'>
				<div className='close-x' onClick={this.props.closeModal}>X</div>
				<form className='create-playlist-modal-form' onSubmit={this.handleSubmit}>
					<label>
						<input 
						placeholder="Title"
						onChange={this.update('title')} 
						value={this.state.title} 
						/>
					</label>
					<label>
						<input
							placeholder="Description"
							onChange={this.update('description')}
							value={this.state.description}
						/>
					</label>
					<button>Create Playlist</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		playlists: state.entities.playlists.playlists,
		currentUser: state.entities.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
		closeModal: () => dispatch(closeModal()),
		sendPlaylistId: (playlistId) => dispatch(sendPlaylistId(playlistId)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist)
);
