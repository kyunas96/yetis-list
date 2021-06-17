import { connect } from 'react-redux';
import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { createPlaylist, fetchPlaylists } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';

class CreatePlaylist extends React.Component {
	constructor(props) {
		super(props);
		const userId = this.props.currentUserId;
		this.state = {
			userId,
			title: '',
			description: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update(field) {
		return (e) =>
			this.setState({
				[field]: e.currentTarget.value,
			});
	}

	handleSubmit(e) {
		e.preventDefault();
		const newState = Object.assign({}, this.state);
		if (newState.description.length < 1) {
			newState.description = 'users playlist'
		} 

		this.props.createPlaylist(newState).then(() => {
			this.props.fetchPlaylists(this.props.currentUserId);
			this.props.closeModal();
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.props.closeModal}>exit</button>
				<form onSubmit={this.handleSubmit}>
					<label>
						Title
						<input onChange={this.update('title')} value={this.state.title} />
					</label>
					<label>
						Description
						<input
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
		currentUserId: state.session.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
		// updatePlaylist: (playlist) => dispatch(updatePlaylist(playlist)),
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
		closeModal: () => dispatch(closeModal()),
		// openModal: () => dispatch(openModal('create-playlist'))
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist)
);
