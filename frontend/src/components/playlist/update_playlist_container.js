import { connect } from 'react-redux';
import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { updatePlaylist, fetchPlaylists } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';
import './playlist_css/update-playlist-modal.css'

class UpdatePlaylist extends React.Component {
	constructor(props) {
		super(props);
		const userId = this.props.currentUser
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
		this.props
			.updatePlaylist({ data: this.state, id: this.props.playlistId })
			.then(() => {
				this.props.closeModal();
				this.props.fetchPlaylists(this.state.userId)
			});

	}

	render() {
		return (
			<div className="rename-playlist-form-container">
				<div className='close-x' onClick={this.props.closeModal}>X</div>
				<div className="form-instruction">
				OMG Yeti write wrong thing! Sorry, Friend! Tell Yeti correct name, hmmm?
				</div>
				<form className="rename-playlist-form" onSubmit={this.handleSubmit}>
					<label>
						<input 
							className="input"
							onChange={this.update('title')} 
							placeholder="New Title" />
					</label>
					<label>
						<input
							className="input"
							onChange={this.update('description')}
							placeholder="New Description"
						/>
					</label>
					<button className="rename-playlist-button">Save Changes</button>
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
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UpdatePlaylist)
);
