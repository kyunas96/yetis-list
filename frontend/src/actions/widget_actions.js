import { getTrackAnalysis } from "../util/search_api_util";

export const RECEIVE_SONG_ID = 'RECEIVE_SONG_ID';
export const RECEIVE_SONG_ANALYSIS = 'RECEIVE_SONG_ANALYSIS';

export const receiveSongId = (songId) => {
    return {
        type: RECEIVE_SONG_ID,
        songId
    }
}

export const receiveSongAnalysis = (analysis) => {
    return {
        type: RECEIVE_SONG_ANALYSIS,
        analysis
    }
}

export const fetchTrackAnalysis = (songId) => (dispatch) => {
    getTrackAnalysis(songId)
        .then((payload) => receiveSongAnalysis(payload))
        .catch((err) => {console.log(err)})
}