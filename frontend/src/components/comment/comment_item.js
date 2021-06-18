import React, { Component } from 'react';
import {fetchPlaylists} from '../../actions/playlist_actions'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class CommentItem extends Component {
    constructor(props) {
        super(props);
        const comment = this.props.comment;
        this.state = { comment }
    }

    componentDidMount() {
		this.props.fetchPlaylists(this.props.currentUserId)
	}

    render() { 
        const {text} = this.state.comment;
        return (  
            <li className='comment-item'>
                {text}
                <div className=''>Delete Comment</div>
            </li>
        );
    }
}

const mSTP = (state, ownProps) => {
	
	return {
		currentUserId: state.entities.users.id,
	};
};

const mDTP = (dispatch) => {
	return {
		fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
	};
};

export default withRouter(connect(mSTP, mDTP)(CommentItem));