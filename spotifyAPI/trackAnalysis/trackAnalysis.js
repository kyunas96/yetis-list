var SpotifyWebApi = require("spotify-web-api-node");
var spotifyKeys = require("../keys/keys");
var trackAnalysisFormatter = require('./trackAnalyisFormatter');

module.exports = function getTrackAnalysis(value, res) {
  // Create the api object with the credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: spotifyKeys.clientId,
    clientSecret: spotifyKeys.clientSecret,
  });

  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      // console.log("The access token expires in " + data.body["expires_in"]);
      // console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);

      spotifyApi.getAudioFeaturesForTrack(value).then(
        function (data) {
          res.json(data.body)
        },
        function (err) {
          res.json("something went wrong").status()
        }
      );
    },
    function (err) {
      // console.log("Something went wrong when retrieving an access token", err);
    }
  );
};
