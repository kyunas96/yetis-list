const searchTracks = require('./tracks');
const searchArtists = require('./artists');
const searchGenres = require('./genres');

module.exports = function search(value, title, res){
  switch(title){
    case 'track':
      searchTracks(value, res)
      break;
    case 'artist':
      searchArtists(value, res)
      break;
    case 'genre':
      searchGenres(value, res)
      break;
    default:
      console.error("invalid search type")
  }
}


// // will generate a playlist with seeds that a represented as an object
// makePlaylist(){