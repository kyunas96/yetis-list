import { RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST_ID, RECEIVE_ALL_PLAYLISTS } from '../actions/playlist_actions';
import {RECEIVE_USER_LOGOUT} from '../actions/session_actions'

const _initialState = {
	allPlaylists: [],
	playlists: [],
	id: null,
};

const playlistReducer = (state = _initialState, action) => {
	console.log("playlist action", action.playlists);
	Object.freeze(state)
	const newState = Object.assign({}, state)

	switch (action.type) {
		case RECEIVE_PLAYLISTS:
			newState.playlists = action.playlists;
			return newState;
		case RECEIVE_ALL_PLAYLISTS:
			newState.allPlaylists = action.playlists;
			return newState;
		case RECEIVE_PLAYLIST_ID:
			newState.id = action.playlistId;
			return newState;
		case RECEIVE_USER_LOGOUT:
			newState.id = null;
			newState.playlists = [];
			newState.allPlaylists = [];
			return newState;
		default:
			return state;
	}
};

export default playlistReducer;
