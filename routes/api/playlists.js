const express = require('express');
const router = express.Router();
const Playlist = require('../../models/Playlist');
const validatePlaylistInput = require('../../validation/playlist');

// create playlist
router.post('/', (req, res) => {
	const { errors, isValid } = validatePlaylistInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	let newPlaylist;

	newPlaylist.save().then((playlist) => res.json(playlist));
});

// delete playlist 
router.get('/user/:user_id', (req, res) => {
	
});

// get all playlists from every user
router.get('/', (req, res) => {
	Playlist.find()
		.sort({ date: -1 })
		.then((playlists) => res.json(playlists))
		.catch((err) =>
			res.status(404).json({ noplaylistsfound: 'No playlists found' })
		);
});

// get all playlists for a user
router.get('/user/:user_id', (req, res) => {
	Playlist.find({ user: req.params.user_id })
		.then((playlists) => res.json(playlists))
		.catch((err) =>
			res
				.status(404)
				.json({ noplaylistsfound: 'No playlists found from that user' })
		);
});

// get playlist by id
router.get('/:id', (req, res) => {
	Playlist.findById(req.params.id)
		.then((playlist) => res.json(playlist))
		.catch((err) =>
			res
				.status(404)
				.json({ noplaylistfound: 'No playlist found with that ID' })
		);
});

module.exports = router;
