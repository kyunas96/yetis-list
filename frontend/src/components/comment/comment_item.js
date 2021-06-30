import React, { Component } from "react";
import { fetchPlaylists } from "../../actions/playlist_actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/comment_actions";

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
  }

	shouldComponentUpdate(nextProps, nextState){
		console.log("nextProps", nextProps.comment)
		console.log("nextState", nextState)
		if(nextProps.comment !== this.props.comment){
			this.setState()
			console.log("should rerender")
			return true
		}else{
			return false;
		}
	}

  deleteComment() {
    this.props
      .deleteComment(this.props.comment)
      .then((res) => {
        console.log(res.response);
        this.props.fetchPlaylists(this.props.userId);
      })
      .catch((err) => console.log(err.response));
  }

  render() {
    let deleteButton = null;
    if (this.props.userId === this.props.comment.userId) {
      deleteButton = (
        <button onClick={() => this.deleteComment()}>Delete Comment</button>
      );
    }
    const { text, id } = this.props.comment;
    console.log("id", id);
    return (
      <li className="comment-item">
        {text}
        {deleteButton}
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
    fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(CommentItem));
