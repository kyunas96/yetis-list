import { connect } from 'react-redux';
import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { fetchPlaylists, deletePlaylist } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';
import './playlist_css/delete-playlist-modal.css'

class DeletePlaylistContainer extends React.Component {
	constructor(props) {
		super(props);
		const userId = this.props.currentUserId;
        const {title, description} = this.getPlaylistInfo()
		this.state = {
			userId,
			title,
			description,
		};
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

    handleDelete() {
        this.props.deletePlaylist(this.props.playlistId).then(() => {
            this.props.closeModal();
            this.props.fetchPlaylists(this.state.userId);
			this.props.history.push(`/users/${this.state.userId}/profile`);
		})
    }

	render() {
		return (
			<div className="delete-playlist-form-container">
				<div className="close-x" onClick={() => {this.props.closeModal()}}>X</div>
        <div className="form-instruction">
					Is Friend sure Friend want Yeti to delete playlist {this.state.title}?
				</div>
				<div className="buttons">
					<button className="keep-button" onClick={() => {this.props.closeModal()}}>
						No, Keep
					</button>
					<button className="delete-button" onClick={() => this.handleDelete()}>
						Yes, Delete
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		playlists: state.entities.playlists.playlists,
		currentUserId: state.session.user,
        playlistId: state.entities.playlists.id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
		closeModal: () => dispatch(closeModal()),
		deletePlaylist: (playlistId) => dispatch(deletePlaylist(playlistId)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DeletePlaylistContainer)
);
