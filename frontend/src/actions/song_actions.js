import * as SongAPIUtil from '../util/song_api_util';

export const addSongToPlaylist = (song) => (dispatch) => (
	SongAPIUtil.addSongToPlaylist(song).then(
	(res) => {
		return res.data
	}).catch((err) => {})
)

export const removeSongFromPlaylist = (song) => (dispatch) => (
	SongAPIUtil.removeSongFromPlaylist(song).then(
	(res) => {
		return res.data
	}).catch((err) => {})
)