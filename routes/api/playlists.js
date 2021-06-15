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

	let newPlaylist = new Playlist(req.body);

	newPlaylist.save().then((playlist) => res.json(playlist));
});

// get all playlists from every user
router.get('/', (req, res) => {
	Playlist.find()
		.sort({ date: -1 })
		.then((playlists) => res.json(playlists))
		.catch((err) =>
			res.status(404).json({ noPlaylistsFound: 'No playlists found' })
		);
});

// get all playlists for a user
router.get('/user/:user_id', (req, res) => {
	console.log(req.params);
	Playlist.find({ userId: req.params.user_id })
		.then((playlists) => res.json(playlists))
		.catch((err) =>
			res
				.status(404)
				.json({ noPlaylistsFound: 'No playlists found from that user' })
		);
});

// get playlist by id
router.get('/:id', (req, res) => {
	Playlist.findById(req.params.id)
		.then((playlist) => res.json(playlist))
		.catch((err) =>
			res
				.status(404)
				.json({ noPlaylistFound: 'No playlist found with that ID' })
		);
});

// delete playlist
router.delete('/:id', (req, res) => {
	Playlist.deleteOne({ _id: req.params.id })
		.then(() => res.json({ success: 'playlist deleted' }))
		.catch((err) =>
			res.status(500).json({ couldNotDelete: 'could not delete playlist' })
		);
});

// update playlists
router.patch('/:id', (req, res) => {
	Playlist.findById(req.params.id).then((playlist) =>
		Playlist.updateOne(req.body)
			.then((playlist) => res.json(playlist))
			.catch((err) =>
				res.status(500).json({ couldNotupdate: 'could not update playlist' })
			)
	);
});

module.exports = router;
