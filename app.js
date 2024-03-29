const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const playlists = require('./routes/api/playlists');
const comments = require('./routes/api/comments');
const songs = require('./routes/api/songs');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

mongoose
	.connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch((err) => {
		console.log('not connected to MongoDB')
		console.log(err)
	});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/comments', comments);
app.use('/api/songs', songs);
app.use('/api/playlists', playlists);
app.use('/api/users', users);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
