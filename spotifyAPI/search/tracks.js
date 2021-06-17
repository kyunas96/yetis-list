var SpotifyWebApi = require('spotify-web-api-node');
var spotifyKeys = require('../keys/keys')
var trackUtils = require('../list/tracks')

module.exports = function searchTracks(value, res) {
  // Create the api object with the credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: spotifyKeys.clientId,
    clientSecret: spotifyKeys.clientSecret,
  });

  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);

      spotifyApi.searchTracks(`track:${value}`, { limit: 10 }).then(
        function (data) {
          // console.log(`Search tracks by "${value}" in the track name and
          // "Kendrick Lamar" in the artist name: ${data}`);
          let tracks = trackUtils.getTracksForList(data);
          res.json(tracks)
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
}
