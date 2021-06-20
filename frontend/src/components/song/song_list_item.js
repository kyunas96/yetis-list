import React, { Component } from 'react';

const SongListItem = ({song}) => {
    console.log(song)
    return (  
        <li className='song-item'>
            <img src={song.image.small} />
            <div>
                {song.artists[0]}
            </div>
            <div>
                {song.name}
            </div>
        </li>
    );
}


 
export default SongListItem;