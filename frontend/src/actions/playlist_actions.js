import * as APIUtil from '../util/playlists_api_util';

export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
export const RECEIVE_ALL_PLAYLISTS = 'RECEIVE_ALL_PLAYLISTS';
export const RECEIVE_PLAYLIST_ID = 'RECEIVE_PLAYLIST_ID';
export const REMOVE_PLAYLIST_ID = 'REMOVE_PLAYLIST_ID';


export const receivePlaylists = (playlists) => {
    return {
	    type: RECEIVE_PLAYLISTS,
	    playlists,
    }
};

export const receiveAllPlaylists = (playlists) => {
    return {
	    type: RECEIVE_ALL_PLAYLISTS,
	    playlists,
    }
};


export const sendPlaylistId = (playlistId) => {
    return {
	    type: RECEIVE_PLAYLIST_ID,
	    playlistId,
    }
};

export const fetchPlaylists = (userId) => (dispatch) =>
	APIUtil.fetchPlaylists(userId).then(
		(res) => {
			dispatch(receivePlaylists(res.data))
			return res.data
		},
	);

export const fetchAllPlaylists = () => (dispatch) =>
	APIUtil.fetchAllPlaylists().then(
		(res) => {
			dispatch(receiveAllPlaylists(res.data))
			return res.data
		},
	);

export const createPlaylist = (playlist) => (dispatch) => 
	APIUtil.createPlaylist(playlist).then(
		(res) => {
			return res.data
		},
	);

export const updatePlaylist = (item) => (dispatch) =>
	APIUtil.updatePlaylist(item).then(
		(res) => {
			dispatch(receivePlaylists(res.data))
		})
	
export const deletePlaylist = (playlistId) => (dispatch) => (
	APIUtil.deletePlaylist(playlistId)
)
