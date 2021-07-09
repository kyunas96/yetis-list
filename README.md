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
  * Underscore

* Backend
  * MongoDB
  * Express
  * Node.js
  * Mongoose
  * JWT
  * Passport
  * Validator
  * BCrypt
  * [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node)

* Integrations
  * Spotify API

### Feature Highlights

Implementation of Spotify API 

Our application makes use of the Spotify Web API node package to retreive customized playlists.

* makePlaylist is called from the backend after receiving the searched item from the frontend
* the searched item is packaged before being passed in to conform to the inputs of the `getRecommendations` api function
* from the express route the `res` object is also passed in in order to set the content of the response once the newly created playlist is received from the Spotify API
* the use of promises ensures that data is only returned to the frontend once it is available from the Spotify API

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

Technologies used to create the Backend

Our application uses Express, Mongoose, and MongoDB along with multiple [other packages](#technologies).

* The user signup route with a method of post will sign up a user. Once it has a request, we use Validator to check for any missing fields or incorrectly formmatted emails. 
* After validating, we check to see if the email already exists in MongoDB. If there are no duplicates then a new user is created using Mongoose, and we encrypt the password * * * using BCrypt. Upon success, the user is returned as JSON.

```js
router.post('/signup', (req, res) => {
   const { errors, isValid } = validateRegisterInput(req.body);
   if (!isValid) return res.status(400).json(errors)
   const {email, username, password} = req.body;

   User.findOne({email}).then((user) => {
      if (user) {
         return res
	   .status(400)
	   .json({ email: 'A user has already registered with this address' });
      } else {
	 const newUser = new User({
	    username,
	    email,
	    password,
	 });

	 bcrypt.genSalt(10, (err, salt) => {
	    bcrypt.hash(newUser.password, salt, (err, hash) => {
	       if (err) throw err;
	       newUser.password = hash;
	       newUser
	          .save()
		  .then(() => res.json(newUser))
		  .catch((err) => console.log(err));
	    });
	 });
      }
   }).catch((err) => console.log(err));
});
```

### Code Snippets
