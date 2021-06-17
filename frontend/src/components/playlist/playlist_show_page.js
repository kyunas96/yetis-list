import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchPlaylists } from '../../actions/playlist_actions';

class PlaylistShowPage extends Component {
	constructor(props) {
		super(props);
		const playlist = this.props.playlist()
		this.state = {playlist}
	}

    componentDidMount() {
		this.props.fetchPlaylists(this.props.currentUser.id)
	}

	render() {
		const {title, description} = this.state.playlist ? this.state.playlist : {title: '', description: ''}
		return (
			<section className='playlist-show'>
				<div>PlaylistShowPage</div>
				<div>{title}</div>
                <div>{description}</div>
			</section>
		);
	}
}

const getPlaylist = (playlists, playlistId) => {
    let selectedPlaylist;
    playlists.forEach(playlist => {
        if (playlist._id === playlistId) {
            selectedPlaylist = playlist; 
        }
    })

    return selectedPlaylist;
}

const mSTP = (state, ownProps) => {
	return {
		currentUser: state.session.user,
        playlist: () => getPlaylist(state.entities.playlists.playlists, ownProps.match.params.playlistId)
	};
};

const mDTP = (dispatch) => {
	return {
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId))
	};
};

export default withRouter(connect(mSTP, mDTP)(PlaylistShowPage));
