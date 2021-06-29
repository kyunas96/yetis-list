const express = require('express');
const router = express.Router();
const Song = require('../../models/Song');
const Playlist = require('../../models/Playlist');

// add song to playlist
// needs...
// in body: NO VALIDATIONS, but should have: song-name, artsist's, image, playlistId
// in params: nothing
router.post('/', (req, res) => {
	let newSong = new Song(req.body);

	newSong.save().then((song) => {
        if (song.playlistId) {
            // adds song to playlist's songs array
            Playlist.findById(song.playlistId).then(playlist => {
                playlist.songs.push({id: song._id, text: song.text, userId: song.userId})
                playlist.save()
            }).catch(() => res.json('could not find playlist'))
        }
		res.json(song)
	}).catch(() => res.json('could not save song'))
});


// remove song from playlist
// needs...
// in body: song
// in params: nothing
router.patch('/', (req, res) => {
 	const song = req.body;
	console.log(song)

	Playlist.findOne({_id: song.playlistId}).then((playlist) => {
		console.log(playlist)
		playlist.songs.forEach(playlistSong => {
			if (song.id.toString() === playlistSong.id.toString()) {
				const indx = playlist.songs.indexOf(playlistSong);
				playlist.songs.splice(indx, 1);
				playlist.save();
			}
		}) 
	})
	.then(() => res.json({ success: 'song removed from playlist' }))
	.catch((err) => res.status(500).json({req, couldNotDelete: 'could not remove song from playlist'}));
});


module.exports = router;
