import axios from 'axios';

export const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export const createComment = (comment) => {
	return axios.post(`/api/comments/`, comment);
};

export const deleteComment = (comment) => {
	return axios.delete(`/api/comments/${comment.playlistId}/${comment.id}`);
};
