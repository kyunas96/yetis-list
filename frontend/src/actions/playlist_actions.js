import * as APIUtil from '../util/playlists_api_util';

export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
export const RECEIVE_PLAYLIST_ID = 'RECEIVE_PLAYLIST_ID';
export const REMOVE_PLAYLIST_ID = 'REMOVE_PLAYLIST_ID';


export const receivePlaylists = (playlists) => {
    return {
	    type: RECEIVE_PLAYLISTS,
	    playlists,
    }
};


export const sendPlaylistId = (playlistId) => {
    return {
	    type: RECEIVE_PLAYLIST_ID,
	    playlistId,
    }
};

export const removePlaylistId = () => {
    return {
	    type: REMOVE_PLAYLIST_ID,
    }
};


export const fetchPlaylists = (userId) => (dispatch) =>
	APIUtil.fetchPlaylists(userId).then(
		(res) => {
			dispatch(receivePlaylists(res.data))
		},
		// (err) => dispatch(receiveErrors(err.response.data))
	);

export const createPlaylist = (playlist) => (dispatch) =>
	APIUtil.createPlaylist(playlist).then(
		(res) => {
			console.log(res)
			dispatch(receivePlaylists(res.data))
		},
		// (err) => dispatch(receiveErrors(err.response.data))
	);

export const updatePlaylist = (item) => (dispatch) =>
	APIUtil.updatePlaylist(item).then(
		(res) => {
			console.log(res)
			dispatch(receivePlaylists(res.data))
		},
		// (err) => dispatch(receiveErrors(err.response.data))
	);

export const deletePlaylist = (playlistId) => (dispatch) =>
	APIUtil.deletePlaylist(playlistId).then(
		(res) => {
			console.log(res)
		},
		// (err) => dispatch(receiveErrors(err.response.data))
	);