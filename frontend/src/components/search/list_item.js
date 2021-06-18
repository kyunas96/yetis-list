import React from "react";
import './search.css'

const ListItem = (props) => {
  let imageSrc = props.item.image.small ? props.item.image.small : "music-solid.svg";
  
  console.log(props.item, 'items')


  const getArtists = () => {
    if (props.item.artist !== undefined) {
      let artistsStr = props.item.artist.join(', ')
      if (artistsStr.length > 20) {
        artistsStr = artistsStr.slice(0,18) + '...'
        console.log(artistsStr)
      }
      let trackArtistText;
      if (artistsStr === undefined) {
        trackArtistText = null
      } else {
        trackArtistText = <span className='track-artists-text'>{artistsStr}</span>
      }
      return trackArtistText
      
    } else {
      return null
    }

    
  }
  
  const nameShortener = () => {
    let displayName = '';
    if (props.item.name.length > 40) {
      displayName = props.item.name.slice(0,37) + '...'
      return displayName
    } else {
      return props.item.name
    }
   

  }
  



  return (
    <li
      className="list-item"
      onClick={() => props.action(props.item.id, props.item.name)}
      key={props.id}
    > 
      <img className="album-art-search" src={imageSrc}></img>
      <div className='info-text'>
        <span className="search-value-name">{nameShortener()}</span>
        {getArtists()}
      </div>
    </li>
  );
};

export default ListItem;
