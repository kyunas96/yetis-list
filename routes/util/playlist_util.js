
const playlistsFormatter = (playlists) => {
    const newObj = {};

    playlists.forEach(playlist => {
        playlist.songs.reverse();
        playlist.comments.reverse();
        newObj[playlist._id] = playlist;
    })
    // console.log('util', newObj)
    return newObj;
}

module.exports = {playlistsFormatter};