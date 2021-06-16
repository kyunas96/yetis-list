import { RECEIVE_PLAYLISTS, RECEIVE_PLAYLIST_ID, REMOVE_PLAYLIST_ID } from '../actions/playlist_actions';

const _initialState = {
	playlists: [],
	id: null
};

const playlistReducer = (state = _initialState, action) => {
	Object.freeze(state)
	const newState = Object.assign({}, state)

	switch (action.type) {
		case RECEIVE_PLAYLISTS:
			newState.playlists = action.playlists;
			return newState;
		case RECEIVE_PLAYLIST_ID:
			newState.id = action.playlistId;
			return newState;
		case REMOVE_PLAYLIST_ID:
			newState.id = null;
			return newState;
		default:
			return state;
	}
};

export default playlistReducer;
