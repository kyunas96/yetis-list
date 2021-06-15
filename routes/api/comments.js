const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const Playlist = require('../../models/Playlist');
const validateCommentInput = require('../../validation/comment');

// create comment
router.post('/', (req, res) => {
    const comment = Object.assign({}, req.body);
    comment.playlistId = req.body.playlistId;
    console.log(comment)
	const { errors, isValid } = validateCommentInput(comment);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	let newComment = new Comment(comment);

	Playlist.findOne(req.params.playlistId)
		.then((playlist) => playlist.comments.push(newComment))
		.catch((err) => console.log(err));

	newComment.save().then((comment) => res.json(comment));
});

// // get all playlists from every user
// router.get('/', (req, res) => {
// 	Playlist.find()
// 		.sort({ date: -1 })
// 		.then((playlists) => res.json(playlists))
// 		.catch((err) =>
// 			res.status(404).json({ noPlaylistsFound: 'No playlists found' })
// 		);
// });

// // get all playlists for a user
// router.get('/user/:user_id', (req, res) => {
// 	console.log(req.params);
// 	Playlist.find({ userId: req.params.user_id })
// 		.then((playlists) => res.json(playlists))
// 		.catch((err) =>
// 			res
// 				.status(404)
// 				.json({ noPlaylistsFound: 'No playlists found from that user' })
// 		);
// });

// // get playlist by id
// router.get('/:id', (req, res) => {
// 	Playlist.findById(req.params.id)
// 		.then((playlist) => res.json(playlist))
// 		.catch((err) =>
// 			res
// 				.status(404)
// 				.json({ noPlaylistFound: 'No playlist found with that ID' })
// 		);
// });

// // delete playlist
// router.delete('/:id', (req, res) => {
// 	Playlist.deleteOne({ _id: req.params.id })
// 		.then(() => res.json({ success: 'playlist deleted' }))
// 		.catch((err) =>
// 			res.status(500).json({ couldNotDelete: 'could not delete playlist' })
// 		);
// });

// // update playlists
// router.patch('/:id', (req, res) => {
// 	Playlist.findById(req.params.id).then((playlist) =>
// 		Playlist.updateOne(req.body)
// 			.then((playlist) => res.json(playlist))
// 			.catch((err) =>
// 				res.status(500).json({ couldNotupdate: 'could not update playlist' })
// 			)
// 	);
// });

module.exports = router;
