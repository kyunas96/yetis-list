import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {saveItem, removeItem } from '../../actions/search_actions'
import {receiveSongId} from '../../actions/widget_actions'

class SongListItem extends Component { 
    
    constructor(props) {
        super(props)
        this.toggleSaveItem = this.toggleSaveItem.bind(this)
        this.renderInitialWidget()
    }

    renderInitialWidget() {
        let {song, receiveSongId, index} = this.props
        if(index === 0) {
            receiveSongId(song.id)
        }
    }
    
    toggleSongColor() {
        const songEle = document.getElementById(`${this.props.song.id}`);
        
        if (songEle.classList[1] === 'selected-song-item') {
            songEle.classList.remove('selected-song-item')
        } else {
            songEle.classList.add('selected-song-item')
        }
    }
    
    toggleSaveItem(song, savedItems) {
        this.toggleSongColor()
        let shouldSave = true;
    
        savedItems.forEach((songItem) => {
            if (song.id === songItem.id) {
                this.props.removeItem(song)
                shouldSave = false
            }
        })
    
        if (shouldSave) this.props.saveItem(song)
    }

    shouldComponentUpdate(nextProps) {
        console.log('hitting component should update-song list item')
        return true
    }
 
    render() {
        const {song, savedItems, receiveSongId} = this.props
        return (
            <>
                <li className='song-item' id={`${song.id}`} onClick={() => this.toggleSaveItem(song, savedItems)}>
                    <img src={song.image.small} />
                    <div>
                        {song.artists[0]}
                    </div>
                    <div>
                        {song.name}
                    </div>
                </li>
                <img onClick={() => receiveSongId(song.id)} height='50px' width='50px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png' />
            </>
        );
    }
}



const mSTP = (state) => {
    return {
        savedItems: state.entities.currentPlaylist.playlist.savedItems,
    }
}

const mDTP = (dispatch) => {
    return {
        saveItem: (song) => dispatch(saveItem(song)),
        removeItem: (song) => dispatch(removeItem(song)),
        receiveSongId: (songId) => dispatch(receiveSongId(songId))
    }
}
 
export default withRouter(connect(mSTP, mDTP)(SongListItem));