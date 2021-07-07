import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
 
export const addSongToPlaylist = (song) => {
  return axios.post(`/api/songs/`, song);
};

export const removeSongFromPlaylist = (song) => {
  return axios.patch(`/api/songs/`, song);
};