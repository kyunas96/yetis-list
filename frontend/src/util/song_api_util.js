import axios from 'axios';
 
export const addSongToPlaylist = (song) => {
  return axios.post(`/api/songs/`, song);
};

export const removeSongFromPlaylist = (song) => {
  return axios.patch(`/api/songs/`, song);
};
