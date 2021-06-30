const express = require('express');
const router = express.Router();
const Song = require('../../models/Song');
const Playlist = require('../../models/Playlist');

// add song to playlist
// needs...
// in body: NO VALIDATIONS, but should have: song-name, artsist's, image, playlistId
// in params: nothing
router.post('/', (req, res) => {
	let song = req.body;
	
	// adds song to playlist's songs array
	Playlist.findById(song.playlistId).then(playlist => {
		playlist.songs.push(song)
		playlist.save()
		res.json(song)
	}).catch(() => res.status(500).json({error: 'could not find playlist'}))
});


// remove song from playlist
// needs...
// in body: song
// in params: nothing
router.patch('/', (req, res) => {
 	const song = req.body;

	Playlist.findOne({_id: song.playlistId}).then((playlist) => {
		playlist.songs.forEach(playlistSong => {
			if (song.id.toString() === playlistSong.id.toString()) {
				const indx = playlist.songs.indexOf(playlistSong);
				playlist.songs.splice(indx, 1);
				playlist.save();
			}
		}) 
	})
	.then(() => res.json({ success: 'song removed from playlist' }))
	.catch((err) => res.status(500).json({song: req.body, couldNotDelete: 'could not remove song from playlist'}));
});


module.exports = router;
