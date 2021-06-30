import React, { Component } from 'react';
import { fetchPlaylists } from '../../actions/playlist_actions';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';

class CommentItem extends Component {
	constructor(props) {
		super(props);
		const comment = this.props.comment;
		this.state = { comment };
        this.deleteComment = this.deleteComment.bind(this)
	}

	componentDidMount() {
		this.props.fetchPlaylists(this.props.userId);
	}

    deleteComment() {
        this.props.deleteComment(this.state.comment.id)
            .then((indx) => {
                console.log(indx)
                this.props.fetchPlaylists(this.props.userId)
            })
            .catch(() => console.log('didnt delete'))
    }

	render() {
        let deleteButton = null;
        if (this.props.userId === this.state.comment.userId) {
            deleteButton = <button onClick={() => this.deleteComment()}>Delete Comment</button>
        }
		const { text, id } = this.state.comment;
        console.log('id', id);
		return (
			<li className='comment-item'>
				{text}
				{deleteButton}
			</li>
		);
	}
}

const mSTP = (state, ownProps) => {
	return {
        userId: state.session.user
	};
};

const mDTP = (dispatch) => {
	return {
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId))
	};
};

export default withRouter(connect(mSTP, mDTP)(CommentItem));
