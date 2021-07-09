# Yeti's List
Yeti's list is an application where users can generate playlists by searching for a song, artist, or genre. Users are also able to generate playlists by selecting for certain song metrics such as danceability, tempo, popularity. Playlists are saved to each user's account and are accessible to all who use the site!
***

![Screenshot](./images/YetiLogo.png)

## Table of Contents

* [Creators](#creators)
* [Background](#background)
* [Technologies](#technologies)
* [Code Snippets](#code-snippets)

### Creators

* [Elijah Ally](https://www.linkedin.com/in/elijah-ally-123ea/)
* [Brian Codington](https://www.linkedin.com/in/brian-codington-8322a8216/)
* [Kevin Oconnor](https://yetis-list.herokuapp.com/placeholder)
* [Kevin Yunas](https://www.linkedin.com/in/kevin-yunas-987325183/)

### Background

### Technologies

* Frontend
  * React
  * Redux
  * Redux-Persist
  * Axios

* Backend
  * MongoDB
  * Express
  * Node.js
  * JWT
  * Passport
  * bcrypt
  * [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node)

* Integrations
  * Spotify API

### Feature Highlights

Implementation of Spotify API 

Our application makes use of the Spotify Web API node package to retreive customized playlists.


```js
function makeplaylist(playlistQueryObject, res) {
  // Create the api object with the credentials
  var spotifyApi = new SpotifyWebApi({
    clientId: spotifyKeys.clientId,
    clientSecret: spotifyKeys.clientSecret,
  });

  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(function (data) {

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);

    spotifyApi.getRecommendations(playlistQueryObject).then(
      (data) => {
        let playlist = playlistUtils.playlistToJSON(data);
        playlist.items = playlist.items.reverse()

        res.json(playlist);
      },
      function (err) {
        console.log(err)
      }
    );
  }).catch(err => console.log(err))
};

```

### Code Snippets
