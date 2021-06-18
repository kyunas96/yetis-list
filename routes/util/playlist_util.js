
const playlistsFormatter = (playlists) => {
    const newObj = {};

    playlists.forEach(playlist => {
        newObj[playlist._id] = playlist;
    })
    console.log('util', newObj)
    return newObj;
}

module.exports = {playlistsFormatter};