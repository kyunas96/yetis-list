var SpotifyWebApi = require("spotify-web-api-node");
var spotifyKeys = require("../keys/keys");
var playlistUtils = require('../list/playlist');

module.exports = function makeplaylist(playlistQueryObject, res) {
  // Create the api object with the credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: spotifyKeys.clientId,
    clientSecret: spotifyKeys.clientSecret,
  });

  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(function (data) {
    // console.log("The access token expires in " + data.body["expires_in"]);
    // console.log("The access token is " + data.body["access_token"]);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);

    spotifyApi.getRecommendations(playlistQueryObject).then(
      (data) => {
        let playlist = playlistUtils.playlistToJSON(data);
        playlist.items = playlist.items.reverse()

        res.json(playlist);
      },
      function (err) {
        res.json('Do not refresh on playlist generation page')
      }
    );
  });
};
