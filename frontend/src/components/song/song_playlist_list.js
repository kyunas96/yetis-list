import React, { Component } from 'react';
import SongPlaylistListItem from './song_playlist_list_item'

const SongPlaylistList = ({songs}) => {
    return ( 
        <ul className='playlist-songs'>
            {songs.length > 0 ? (
                songs.map((song, i) => {
                    return <SongPlaylistListItem key={i} song={song}/> 
                })
            ) : (
                <li className='song-item-show no-songs'>There Are No Songs. Add Some Above</li>
            )}
        </ul>
    );
}
 
export default SongPlaylistList;