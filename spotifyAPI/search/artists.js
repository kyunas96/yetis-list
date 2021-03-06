const spotifyKeys = require('../keys/keys');
var SpotifyWebApi = require("spotify-web-api-node");
const artistUtils = require('../list/artists');


module.exports = function searchArtists(value, res) {

 
  // Create the api object with the credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: spotifyKeys.clientId,
    clientSecret: spotifyKeys.clientSecret,
  });

  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function (data) {

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  ).then(() => {
    spotifyApi
      .searchArtists(value)
      .then(
        function (data) {
          let artists = artistUtils.getArtistsForList(data.body);
          res.json(artists)
        },
        function (err) {
          // console.error(err);
        }
      )
  })
};