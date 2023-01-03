import React, { Component } from "react";
import { fetchAllPlaylists, fetchPlaylists } from "../../actions/playlist_actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/comment_actions";

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
  }

	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.comment !== this.props.comment){
			this.setState()
			return true
		}else{
			return false;
		}
	}

  deleteComment() {
    this.props
      .deleteComment(this.props.comment)
      .then((res) => {
        this.props.fetchPlaylists(this.props.userId)
        this.props.fetchAllPlaylists();
      })
      .catch((err) => {});
  }

  render() {
    let deleteButton = null;
    if (this.props.userId === this.props.comment.userId) {
      deleteButton = (
        <button className='comment-delete' onClick={() => this.deleteComment()}>Delete</button>
      );
    }
    const { text, id, username } = this.props.comment;
    return (
      <li className="comment-item">
        <div className='comment-nav'>
          <div className='comment-username'>{username}</div>
          {deleteButton}
        </div>
        <p className='comment-text'>{text}</p>
      </li>
    );
  }
}

const mSTP = (state, ownProps) => {
  return {
    userId: state.session.user,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchAllPlaylists: () => dispatch(fetchAllPlaylists()),
    fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(CommentItem));
