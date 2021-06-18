import {
	RECEIVE_CURRENT_PLAYLIST,
	CLEAR_CURRENT_PLAYLIST,
} from '../actions/search_actions';

export default function currentPlaylistReducer(state = {}, action) {
	console.log(action);
	Object.freeze(state);
	switch (action.type) {
		case RECEIVE_CURRENT_PLAYLIST:
			return action.playlist;
		case CLEAR_CURRENT_PLAYLIST:
			return {};
		default:
			return state;
	}
}
