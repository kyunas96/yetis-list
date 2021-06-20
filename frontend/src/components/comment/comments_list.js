import React, { Component } from 'react';
import CommentItem from './comment_item'

const CommentList = ({comments, openModal }) => {
    return ( 
        <section className='comments'>
            <ul className='comments-list'>
                {(comments && comments.length > 0)? (
                    <>
                        <li className='comment-item add-comment' onClick={() => openModal()}>Click To Add A Comment</li>
                        {comments.map((comment, i) => {
                            return <CommentItem key={i} comment={comment}/>
                        })}
                    </>
                ) : (
                    <li className='comment-item add-comment' onClick={() => openModal()}>Click To Add A Comment</li>
                )}
            </ul>
        </section>
    );
}
 
export default CommentList;