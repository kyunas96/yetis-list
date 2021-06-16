

const searchTracks = require('./tracks');
const searchArtists = require('./artists');
const searchAlbums = require('./albums')


module.exports = function search(value, title, res){
  switch(title){
    case 'track':
      searchTracks(value, res)
    case 'artist':
      searchArtists(value, res)
    case 'album':
      searchAlbums(value, res)
    default:
      console.error("invalid search type")
  }
}


// // will generate a playlist with seeds that a represented as an object
// makePlaylist(){