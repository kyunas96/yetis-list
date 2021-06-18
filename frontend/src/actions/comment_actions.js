import * as APIUtil from '../util/comment_api_util';

export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';

export const receivePlaylists = (playlists) => {
	return {
		type: RECEIVE_PLAYLISTS,
		playlists
	};
};

export const createComment = (comment) => (dispatch) =>
	APIUtil.createComment(comment)
