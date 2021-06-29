import React, { Component } from 'react';
import { closeModal } from '../../actions/modal_actions';
import { createComment } from '../../actions/comment_actions';
import { fetchPlaylists } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class AddComment extends Component {
    constructor(props) {
        super(props);
        const {userId, playlistId} = this.props;
        this.state = {  
            text: '',
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
        // console.log(this.state)
		this.props.createComment(this.state)
			.then(() => {
				this.props.fetchPlaylists(this.props.userId).then(()=> {
					this.props.closeModal()
				})
			})
	}

    render() { 
        return ( 
            <div className='add-comment-modal'>
				<button className='exit-modal' onClick={this.props.closeModal}>exit</button>
				<form className='create-comment-modal-form' onSubmit={this.handleSubmit}>
					<label>
						Write a comment
						<textarea onChange={this.update('text')} value={this.state.text} placeholder='Your thoughts on this playlist...'/>
					</label>
					<button>Post Comment</button>
				</form>
			</div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
	// console.log(ownProps)
	return {
		// playlist: state.playlists.allPlaylists[],
		playlistId: ownProps.location.pathname.split('/')[4],
		userId: state.session.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createComment: (comment) => dispatch(createComment(comment)),
		closeModal: () => dispatch(closeModal()),
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddComment)
);