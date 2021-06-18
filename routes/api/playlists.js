const express = require('express');
const router = express.Router();
const Playlist = require('../../models/Playlist');
const User = require('../../models/User');
const validatePlaylistInput = require('../../validation/playlist');
const Search = require('../../spotifyAPI/search/search');
const makePlaylist = require('../../spotifyAPI/makePlaylist/makeplaylist');
const packageQueryObject = require('../../spotifyAPI/makePlaylist/packagers');
                                          


// create playlist
// needs...
// in body: title, userId, optional: description
// in params: nothing
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
// needs...
// in body: nothing
// in params: nothing
router.get('/', (req, res) => {
	Playlist.find()
		.sort({ date: -1 })
		.then((playlists) => res.json(playlists))
		.catch((err) =>
			res.status(404).json({ noPlaylistsFound: 'No playlists found' })
		);
});

// get all playlists for a user
// needs...
// in body: nothing
// in params: userId
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
// needs...
// in body: nothing
// in params: playlist id
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
// needs...
// in body: nothing
// in params: playlist id
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
// needs...
// in body: title, userId, optional: description
// in params: playlist id
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

router.post('/generate', (req, res) => {
	console.log("req body:" + JSON.stringify(req.body));
	let queryObject = packageQueryObject(req.body);
	console.log(queryObject);
	makePlaylist(queryObject, res)
})

router.post('/getlist', (req, res) => {
	// console.log(req.body)
	const { searchValue, seedType } = req.body;
	console.log(searchValue, seedType)
	Search(searchValue, seedType, res)
})

module.exports = router;

// {
// 	seeds: [],
// 	options: {}
// }