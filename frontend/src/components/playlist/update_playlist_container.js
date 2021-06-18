import { connect } from 'react-redux';
import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { updatePlaylist, removePlaylistId, fetchPlaylists } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';

class UpdatePlaylist extends React.Component {
	constructor(props) {
		super(props);
		let userId;
		if (this.props.currentUser) {
			userId = this.props.currentUser.id
		} else {
			userId = this.props.currentUser
		}
        const {title, description} = this.getPlaylistInfo()
		this.state = {
			userId,
			title,
			description,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

    getPlaylistInfo() {
        const select = {};
        this.props.playlists.forEach(playlist => {
            if (playlist._id === this.props.playlistId) {
                select.title = playlist.title;
                select.description = playlist.description;
            }
        })
        return select;
    }

	update(field) {
		return (e) =>
			this.setState({
				[field]: e.currentTarget.value,
			});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log({ data: this.state, id: this.props.playlistId })
		this.props
			.updatePlaylist({ data: this.state, id: this.props.playlistId })
			.then(() => {
				this.props.closeModal();
				this.props.removePlaylistId()
				this.props.fetchPlaylists(this.state.userId)
				this.props.history.push(`/users/${this.state.userId}/profile`)
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
					<button>Save Changes</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		playlists: state.entities.playlists.playlists,
		currentUser: state.session.user,
        playlistId: state.entities.playlists.id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updatePlaylist: (item) => dispatch(updatePlaylist(item)),
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
		closeModal: () => dispatch(closeModal()),
		removePlaylistId: () => dispatch(removePlaylistId()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UpdatePlaylist)
);
