import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchPlaylists } from '../../actions/playlist_actions';
import { openModal } from '../../actions/modal_actions';
import CommentItem from '../comment/comment_item';
import './playlist_css/playlist-show-page.css'

class PlaylistShowPage extends Component {
	constructor(props) {
		super(props);
		const playlist = this.getPlaylist(this.props.playlists, this.props.playlistId)
		this.state = {playlist}
	}

    componentDidMount() {
		this.props.fetchPlaylists(this.props.currentUser.id)
	}


	getPlaylist(playlists, playlistId) {
		console.log(playlists)
		console.log(playlistId)
		let selectedPlaylist;
		playlists.forEach(playlist => {
			if (playlist._id === playlistId) {
				selectedPlaylist = playlist; 
			}
		})
		
		return selectedPlaylist;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.playlist !== nextState.playlist || nextProps !== this.props) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const {title, description, comments, songs} = this.state.playlist ? this.state.playlist : {title: '', description: ''}
		return (
			<section className='playlist-show-page'>
				<section className='comments'>
					<ul className='comments-list'>
						{(comments && comments.length > 0)? (
							<>
								<li className='comment-item add-comment' onClick={() => this.props.openModal()}>Click To Add A Comment</li>
								{comments.map((comment, i) => {
									return <CommentItem key={i} comment={comment}/>
								})}
							</>
						) : (
							<li className='comment-item add-comment' onClick={() => this.props.openModal()}>Click To Add A Comment</li>
						)}
					</ul>
				</section>
				<section className='playlist-info'>
					<div className='playlist-header'>
						<div className='playlist-title'>{title}</div>
    		            <div className='playlist-description'>{description}</div>
					</div>
					<ul className='playlist-songs'>
						<li className='song-item'>Songs Here</li>
						<li className='song-item'>Songs Here</li>
						<li className='song-item'>Songs Here</li>
						<li className='song-item'>Songs Here</li>
						<li className='song-item'>Songs Here</li>
						<li className='song-item'>Songs Here</li>
						<li className='song-item'>Songs Here</li>
						<li className='song-item'>Songs Here</li>
					</ul>
				</section>
			</section>
		);
	}
}



const mSTP = (state, ownProps) => {
	
	return {
		currentUser: state.entities.users,
        playlists: state.entities.playlists.playlists,
		playlistId: ownProps.match.params.playlistId,
	};
};

const mDTP = (dispatch) => {
	return {
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
		openModal: () => dispatch(openModal('add-comment'))
	};
};

export default withRouter(connect(mSTP, mDTP)(PlaylistShowPage));
