var SpotifyWebApi = require("spotify-web-api-node");
var spotifyKeys = require('../keys/keys')
var albumUtils = require('../list/albums')

module.exports = function searchAlbums(value, res) {
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

      spotifyApi.searchAlbums(value).then(
        function (data) {
          let albums = albumUtils.getAlbumsForList(data.body);
          res.json(albums)
        },
        function (err) {
          console.error(err);
        }
      );
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
};