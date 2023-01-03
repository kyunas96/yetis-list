var SpotifyWebApi = require("spotify-web-api-node");
var spotifyKeys = require("../keys/keys");
var genreUtils = require('../list/genres');

module.exports = function searchGenres(value, res) {
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

      spotifyApi.getAvailableGenreSeeds().then(
        function (data) {
          let matches = genreUtils.findMatches(value, data);
          res.json(matches);
        },
        function (err) {
          // console.log("Something went wrong!", err);
        }
      );
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
};