import React, { Component } from 'react';

const SongListItem = ({song}) => {
    return (  
        <li className='song-item'>
            {console.log('songs', song)}
        </li>
    );
}
 
export default SongListItem;