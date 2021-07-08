const spotifyKeys = require("./keys/keys");
const MakePlaylist = require("./makePlaylist/makeplaylist");
const trackUtils = require("./list/tracks");
const artistUtils = require("./list/artists");
const albumUtils = require("./list/albums")

var SpotifyWebApi = require("spotify-web-api-node");

function getArtistAlbums(albumId) {
  let album;
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

      spotifyApi.getArtistAlbums(`${albumId}`, {}, function (err, data) {
        if (err) {
          // console.error("Something went wrong!");
        } else {
          // console.log(data.body);
        }
      });
    },
    function (err) {
      // console.log("Something went wrong when retrieving an access token", err);
    }
  );
}

function getAlbum(albumId) {
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

      spotifyApi.getAlbum(`${albumId}`, {}, function (err, data) {
        if (err) {
          console.error("Something went wrong!");
        } else {
          return data;
        }
      });
    },
    function (err) {
      // console.log("Something went wrong when retrieving an access token", err);
    }
  );
}

function getTrack(trackId) {
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

      spotifyApi.getTrack(`${trackId}`).then((data) => console.log(data));
    },
    function (err) {
      // console.log("Something went wrong when retrieving an access token", err);
    }
  );
}

function getRecommendations(recommendationsObject){
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

      spotifyApi
        .getRecommendations({
          min_energy: 0.4,
          seed_artists: ["6mfK6Q2tzLMEchAr0e9Uzu", "4DYFVNKZ1uixa6SQTvzQwJ"],
          min_popularity: 50,
        })
        .then(
          function (data) {
            let recommendations = data.body;
            // console.log(recommendations);
          },
          function (err) {
            // console.log("Something went wrong!", err);
          }
        );
    },
    function (err) {
      // console.log("Something went wrong when retrieving an access token", err);
    }
  );
}

function getAvailableGenreSeeds() {
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

      spotifyApi
        .getAvailableGenreSeeds()
        .then((data) =>
          data.body.genres.forEach((genre) => console.log(genre))
        );
    },
    function (err) {
      // console.log("Something went wrong when retrieving an access token", err);
    }
  );
}

function getDanceable() {
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

      spotifyApi
        .search("", ["track", "playlist"], { min_danceability: 0.9 })
        // .then((data) => console.log(data));
    },
    function (err) {
      // console.log("Something went wrong when retrieving an access token", err);
    }
  );
}

module.exports = {
  getArtistAlbums,
  getAlbum,
  getTrack,
  getAvailableGenreSeeds,
  getDanceable,
  getRecommendations
};
