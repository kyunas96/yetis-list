

export const RECEIVE_SONG_ID = 'RECEIVE_SONG_ID'


export const receiveSongId = (songId) => {
    return {
        type: RECEIVE_SONG_ID,
        songId
    }
}