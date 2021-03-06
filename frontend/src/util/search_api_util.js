import axios from 'axios'

export const submitSeed = (seedData) => {
    return axios.post('/api/playlists/generate', seedData);
};

export const getListItems = (searchItem) => {
    return axios.post('/api/playlists/getlist', searchItem)
}