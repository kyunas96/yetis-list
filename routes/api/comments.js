const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const Playlist = require('../../models/Playlist');
const validateCommentInput = require('../../validation/comment');

// create comment
router.post('/', (req, res) => {
	const { errors, isValid } = validateCommentInput(req.body);

	if (!isValid) return res.status(400).json(errors);

	let newComment = new Comment(req.body);

	newComment.save().then((comment) => {

		// adds comment to playlist's comments array
		Playlist.findOne({_id: comment.playlistId}).then(playlist => {
			playlist.comments.push({id: comment._id, text: comment.text, userId: comment.userId})
			playlist.save()
		}).catch(() => res.json('could not find playlist'))
		res.json(comment)
	}).catch(() => res.json('could not save comment'))
});

// get comment by id
router.get('/:id', (req, res) => {
	Comment.findById(req.params.id)
		.then((comment) => res.json(comment))
		.catch((err) =>
			res
				.status(404)
				.json({ nocommentFound: 'No comment found with that ID' })
		);
});

// delete comment
router.delete('/:id', (req, res) => {
	Comment.findById(req.params.id).then((comment) => {
		Comment.deleteOne({_id: req.params.id}).then(() => {

			Playlist.findById(comment.playlistId).then((playlist) => {
				playlist.comments.forEach(com => {
					if (com.id.toString() === comment._id.toString()) {
						const indx = playlist.comments.indexOf(com);
						playlist.comments.splice(indx, 1);
						playlist.save();
					}
				})
			})
		})
		.then(() => res.json({ success: 'comment deleted' }))
		.catch((err) =>
			res.status(500).json({ couldNotDelete: 'could not delete comment' })
		);
	})
});

// update comments
router.patch('/:id', (req, res) => {
	Comment.findOneAndUpdate({_id: req.params.id}, req.body)
		.then(() => {
			const comment = req.body;
			comment._id = req.params.id;

			// adds updated comment to playlist
			Playlist.findById(comment.playlistId).then((playlist) => {

				playlist.comments.forEach(com => {
					if (com.id.toString() === comment._id.toString()) {
						const indx = playlist.comments.indexOf(com);
						playlist.comments.splice(indx, 1);
						playlist.comments.push({id: comment._id, text: comment.text, userId: comment.userId});
						playlist.save();
					}
				})
			}).then(() => {
				res.json(comment)
			})
		})
		.catch((err) =>
			res.status(500).json({ couldNotupdate: 'could not update comment' })
		)
});


module.exports = router;
