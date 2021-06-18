import React, { Component } from 'react';

class CommentItem extends Component {
    constructor(props) {
        super(props);
        const comment = this.props.comment;
        this.state = { comment }
    }

    render() { 
        const {text} = this.state.comment;
        return (  
            <li className='comment-item'>
                {text}
            </li>
        );
    }
}
 
export default CommentItem;