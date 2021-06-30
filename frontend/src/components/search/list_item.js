import React from 'react';
import './search.css';

const ListItem = (props) => {
//   console.log(props)
	let imageSrc = props.item.image.small
		? props.item.image.small
		: 'music-solid.svg';

	const getArtists = () => {
		if (props.item.artist !== undefined) {
			let artistsStr = props.item.artist.join(', ');
			if (artistsStr.length > 20) {
				artistsStr = artistsStr.slice(0, 18) + '...';
				// console.log(artistsStr);
			}
			let trackArtistText;
			if (artistsStr === undefined) {
				trackArtistText = null;
			} else {
				trackArtistText = (
					<span className='track-artists-text'>{artistsStr}</span>
				);
			}
			return trackArtistText;
		} else {
			return null;
		}
	};

	const nameShortener = () => {
		let displayName = '';
		if (props.item.name.length > 40) {
			displayName = props.item.name.slice(0, 37) + '...';
			return displayName;
		} else {
			return props.item.name;
		}
	};

	// let imageSrc = props.item.image.hasImage ? props.item.image.small : "/music-solid.svg";

	return (
		<li
			className='list-item'
			onClick={() =>
				props.action
					? props.action(props.item.id, props.item.name)
					: props.setSeed(props.item)
			}
			key={props.id}>
			<img className='album-art-search' src={imageSrc}></img>
			<div className='info-text'>
				<span className='search-value-name'>{nameShortener()}</span>
				{getArtists()}
			</div>
		</li>
	);
};

export default ListItem;
