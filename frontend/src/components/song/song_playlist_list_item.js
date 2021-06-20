import React, { Component } from 'react';
{/* <li className='song-item-show'>Songs Here</li> */}


const SongListItem = ({song}) => {
    console.log(song)
    return (  
        <li className='song-item-show'>
            <img src={song.image.small} />
            <div>
                {song.artist[0]}
            </div>
            <div>
                {song.name}
            </div>
        </li>
    );
}


 
export default SongListItem;