import { connect } from 'react-redux';
import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { fetchPlaylists, deletePlaylist } from '../../actions/playlist_actions';
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
            this.props.fetchPlaylists(this.state.userId)
        })
    }

	render() {
		return (
			<div>
        <div>Is Friend sure Friend want Yeti to delete playlist {this.state.title}?</div>
				<button onClick={() => {this.props.closeModal()}}>
					No, Keep
				</button>
				<button onClick={() => this.handleDelete()}>
					Yes, Delete
				</button>
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
