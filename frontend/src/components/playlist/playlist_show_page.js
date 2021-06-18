import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchAllPlaylists } from '../../actions/playlist_actions';
import { openModal } from '../../actions/modal_actions';
import CommentItem from '../comment/comment_item';
import './playlist_css/playlist-show-page.css'

class PlaylistShowPage extends Component {
	constructor(props) {
		super(props);
		
		// this.state = {playlist}
	}

    componentDidMount() {
		this.props.fetchAllPlaylists()
		// thi
	}


	shouldComponentUpdate(nextProps, nextState) {
		// console.log('should',nextProps)
		console.log('should-this',this.props)
		
		if (!this.props.playlist && (nextProps.playlist !== this.props.playlist)) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		console.log('render')
		const {title, description, comments, songs} = this.props.playlist ? this.props.playlist : {title: '', description: ''}
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
	console.log('show',state)
	// console.log('show',ownProps)
	return {
		currentUser: state.entities.users,
        playlist: state.entities.playlists.allPlaylists[ownProps.match.params.playlistId],
	};
};

const mDTP = (dispatch) => {
	return {
		fetchAllPlaylists: () => dispatch(fetchAllPlaylists()),
		openModal: () => dispatch(openModal('add-comment'))
	};
};

export default withRouter(connect(mSTP, mDTP)(PlaylistShowPage));
