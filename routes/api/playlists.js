const express = require('express');
const router = express.Router();
const Playlist = require('../../models/Playlist');
const User = require('../../models/User');
const validatePlaylistInput = require('../../validation/playlist');

// create playlist
router.post('/', (req, res) => {
	const { errors, isValid } = validatePlaylistInput(req.body);

	if (!isValid) return res.status(400).json(errors);

	let newPlaylist = new Playlist(req.body);

	newPlaylist.save().then((playlist) => {

		// adds playlist to users playlists array
		User.findOne({_id: playlist.userId}).then(user => {
			user.playlists.push({id: playlist._id, title: playlist.title})
			user.save()
		}).catch(() => res.json('could not find user'))
		res.json(playlist)
	}).catch(() => res.json('could not save playlist'))
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
	Playlist.findById(req.params.id).then((playlist) => {
		Playlist.deleteOne({ _id: req.params.id }).then(() => {
			
			User.findById(playlist.userId).then((user) => {
				user.playlists.forEach(ply => {
					if (ply.id.toString() === playlist._id.toString()) {
						const indx = user.playlists.indexOf(ply)
						user.playlists.splice(indx, 1);
						user.save();
					}
				})
			})
		})
		.then(() => res.json({ success: 'playlist deleted' }))
		.catch((err) =>
			res.status(500).json({ couldNotDelete: 'could not delete playlist' })
		);
	})
});

// update playlists
router.patch('/:id', (req, res) => {
	Playlist.findOneAndUpdate({_id: req.params.id}, req.body)
		.then(() => {
			const playlist = req.body;
			playlist._id = req.params.id;

			// adds updated playlist to user playlists
			User.findById(playlist.userId).then((user) => {
				user.playlists.forEach(ply => {
					if (ply.id.toString() === playlist._id.toString()) {
						const indx = user.playlists.indexOf(ply)
						user.playlists.splice(indx, 1);
						user.playlists.push({id: playlist._id, title: playlist.title});
						user.save();
					}
				})
			}).then(() => {
				res.json(playlist)
			})
		})
		.catch((err) =>
			res.status(500).json({ couldNotupdate: 'could not update playlist' })
		)
});

module.exports = router;
