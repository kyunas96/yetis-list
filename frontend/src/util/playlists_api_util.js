import axios from 'axios';

export const fetchPlaylists = (userId) => {
  return axios.get(`/api/playlists/user/${userId}`);
};

export const fetchAllPlaylists = () => {
  return axios.get(`/api/playlists/`);
};

export const createPlaylist = (playlist) => {
  return axios.post(`/api/playlists/`, playlist);
};

export const updatePlaylist = ({data, id}) => {
  return axios.patch(`/api/playlists/${id}`, data);
};

export const deletePlaylist = (playlistId) => {
  return axios.delete(`/api/playlists/${playlistId}`);
};
