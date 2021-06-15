const express = require('express');
const router = express.Router();
const Playlist = require('../../models/Playlist');
const validatePlaylistInput = require('../../validation/playlist');

router.post('/', (req, res) => {
	const { errors, isValid } = validatePlaylistInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	
    let newPlaylist;
    // Playlist.find({userId: req.body.userId}).then(() => {
    //     newPlaylist =  new Playlist(req.body);
    //     collection.insertOne(newPlaylist);
    // });

    res.send(newPlaylist);
});

// router.get('/', (req, res) => {

//     Playlist.findOne({userId: req.body.userId}).then(playlist => {
//         res.send(playlist)
//     }).catch(err => console.log(err))
// });

module.exports = router;
