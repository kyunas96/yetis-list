import {
	RECEIVE_CURRENT_PLAYLIST,
	CLEAR_CURRENT_PLAYLIST,
	RECEIVE_CURRENT_PLAYLIST_DETAILS,
	RECEIVE_SONG_ITEM,
	REMOVE_SONG_ITEM
} from '../actions/search_actions';

const _initialState = {
	playlist: {
		items: [],
		seeds: [],
		savedItems: []
	},
	playlistDetails: {}
}



export default function currentPlaylistReducer(state = _initialState, action) {
	Object.freeze(state);
	const newState = Object.assign({}, state)
	switch (action.type) {
		case RECEIVE_CURRENT_PLAYLIST:
			newState.playlist.items = action.playlist.items;
			newState.playlist.seeds = action.playlist.seeds;
			return newState;
		case RECEIVE_SONG_ITEM:
			newState.playlist.savedItems.push(action.song);
			return newState;
		case REMOVE_SONG_ITEM:
			newState.playlist.savedItems.forEach((song) => {
				if 	(action.song.id === song.id) {
					const indx = newState.playlist.savedItems.indexOf(song) 
					newState.playlist.savedItems.splice(indx, 1)
				}
			});
			return newState;
		case CLEAR_CURRENT_PLAYLIST:
			return {
				playlist: {
					items: [],
					seeds: [],
					savedItems: []
				},
				playlistDetails: {}
			};
		case RECEIVE_CURRENT_PLAYLIST_DETAILS:
			newState.playlistDetails = action.details;
			return newState;
		default:
			return state;
	}
}
