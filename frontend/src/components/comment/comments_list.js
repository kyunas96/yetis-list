import React, { useState, useEffect } from 'react';
import CommentItem from './comment_item'

const CommentList = ({comments, openModal }) => {
	console.log('comment-list',comments)

    const [classComments, setComments] = useState(comments);


    useEffect(() => {
        setComments(comments)
    }, [classComments, comments])

    return ( 
        <section className='comments'>
            <ul className='comments-list'>
                {(comments && comments.length > 0)? (
                    <>
                        <li className='comment-item add-comment' onClick={() => openModal()}>Click To Add A Comment</li>
                        {classComments.map((comment, i) => {
                            console.log(comment)
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