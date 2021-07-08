import axios from 'axios';

export const createComment = (comment) => {
	return axios.post(`/api/comments/`, comment);
};

export const deleteComment = (comment) => {
	return axios.delete(`/api/comments/${comment.playlistId}/${comment.id}`);
};
