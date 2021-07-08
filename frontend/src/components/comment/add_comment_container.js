import React, { Component } from 'react';
import { closeModal } from '../../actions/modal_actions';
import { createComment } from '../../actions/comment_actions';
import { fetchAllPlaylists, fetchPlaylists } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './create_comment_modal.css'

class AddComment extends Component {
    constructor(props) {
        super(props);
        const {userId, playlistId, username} = this.props;
        this.state = {  
            text: '',
			username,
            userId,
            playlistId
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
		return (e) =>
			this.setState({
				[field]: e.currentTarget.value,
			});
	}

    handleSubmit(e) {
		e.preventDefault();
		this.props.createComment(this.state)
			.then(() => this.props.closeModal())
			.then(() => {
				this.props.fetchAllPlaylists()
				this.props.fetchPlaylists(this.state.userId)
			})
			
	}

    render() { 
        return ( 
          <div className='add-comment-modal'>
						<div className='close-x' onClick={this.props.closeModal}>X</div>
						<form className='create-comment-modal-form' onSubmit={this.handleSubmit}>
							<div className="form-instruction">
								Yeti Friend tell Friend what Yeti Friend think of Friend playlist.
							</div>
							<label>
								<textarea 
								className="text-area"
								onChange={this.update('text')} 
								value={this.state.text} 
								placeholder='Tell Yeti about Friend playlist...'
								/>
							</label>
							<button className="post-comment-button">Post Comment</button>
						</form>
					</div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
	return {
		playlistId: ownProps.location.pathname.split('/')[4],
		userId: state.session.user,
		username: state.entities.users.username
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createComment: (comment) => dispatch(createComment(comment)),
		closeModal: () => dispatch(closeModal()),
		fetchAllPlaylists: () => dispatch(fetchAllPlaylists()),
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId))
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddComment)
);