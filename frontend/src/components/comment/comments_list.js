import React, { useState, useEffect } from 'react';
import CommentItem from './comment_item'

const CommentList = ({comments, openModal }) => {
	console.log('comment-list',comments)


    return ( 
        <section className='comments'>
            <div className='comment-item add-comment' onClick={() => openModal()}>Click To Add A Comment</div>
            <ul className='comments-list'>
                {(comments && comments.length > 0)? (
                    <>
                        {comments.map((comment, i) => {
                            console.log(comment)
                            return <CommentItem key={i} comment={comment}/>
                        })}
                    </>
                ) : (
                    <></>
                )}
            </ul>
        </section>
    );
}

export default CommentList;