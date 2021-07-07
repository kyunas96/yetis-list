var SpotifyAPI = require('./spotifyAPI');
var searchArtists = require('./search/artists');
var getTrackAnalysis = require('./trackAnalysis/trackAnalysis');

// SpotifyAPI.getTrack("3Qm86XLflmIXVm1wcwkgDK")
// SpotifyAPI.getAvailableGenreSeeds()
// SpotifyAPI.getRecommendations("3Qm86XLflmIXVm1wcwkgDK")

// SpotifyAPI.getAlbum("5U4W9E5WsYb2jUQWePT8Xm")
//   .then(data => console.log(data))

// console.log(album);

searchArtists('Kendrick Lamar')
getTrackAnalysis("3Qm86XLflmIXVm1wcwkgDK", null);


  // .then(data => console.log(data))
// console.log(x)

// SpotifyAPI.getRecommendations()