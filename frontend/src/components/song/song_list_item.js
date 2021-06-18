import React, { Component } from 'react';

const SongListItem = ({song}) => {
    console.log(song)
    return (  
        <li className='song-item'>
            <div>
                {song.artists[0]}
            </div>
            <div>
                {song.name}
            </div>
        </li>
    );
}
 
// artist image name
 
export default SongListItem;