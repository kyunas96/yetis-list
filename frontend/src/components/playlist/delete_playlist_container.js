import { connect } from 'react-redux';
import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { removePlaylistId, fetchPlaylists, deletePlaylist } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';

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
            this.props.closeModal()
            this.props.removePlaylistId()
            this.props.fetchPlaylists(this.state.userId)
        })
    }

	render() {
		return (
			<div>
                <div>Are you sure you want to delete your playlist {this.state.title}</div>
				<button onClick={() => {
                    this.props.closeModal()
                    this.props.removePlaylistId()
                }}>No</button>
				<button onClick={() => this.handleDelete()}>Yes</button>
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
		removePlaylistId: () => dispatch(removePlaylistId()),
		deletePlaylist: (playlistId) => dispatch(deletePlaylist(playlistId)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DeletePlaylistContainer)
);
