import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistFeedList = ({playlists, currentUserId, sendPlaylistId}) => {

    const formatTitleAndDescription = (type, info) => {
		if (type === 'title' && info.length > 30) {
			info = info.slice(0, 27) + '...';
		}

		if (type === 'description' && info.length > 44) {
			info = info.slice(0, 41) + '...';
		}

		return info;
	}

    return (
        <ul className='playlist-list-ul'>
            {playlists.length > 0 ? (
                playlists.map((playlist, i) => {
                    return (
                        <li
                            key={i}
                            className='feed-item-li'
                            onClick={() => sendPlaylistId(playlist._id)}>
                            <Link
                                className="feed-item"
                                to={`/users/${currentUserId}/playlist/${playlist._id}`}>
                                <h3 className='title-feed'>
                                    {formatTitleAndDescription('title', playlist.title)}
                                </h3>
                                <h3 className='description-feed'>
                                    {formatTitleAndDescription(
                                        'description',
                                        playlist.description
                                    )}
                                </h3>
                            </Link>
                        </li>
                    );
                })
            ) : (
                <li>
                    <h3>No Body Has Any Playlists :</h3>
                </li>
            )}
        </ul>
    );
}
 
export default PlaylistFeedList;