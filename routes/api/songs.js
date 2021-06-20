const express = require('express');
const router = express.Router();
const Song = require('../../models/Song');
const Playlist = require('../../models/Playlist');

// create song
// needs...
// in body: (NO VALIDATIONS) song name, artsists, image, playlistId
// in params: nothing
router.post('/', (req, res) => {
	const song = req.body;
	console.log(song)
	// adds song to playlist's songs array
	Playlist.findOne({_id: song.playlistId}).then(playlist => {
		playlist.songs.push(song)
		playlist.save()
		res.json(playlist)
	}).catch(() => res.json('could not find playlist'))
});

// get song by id
// needs...
// in body: nothing
// in params: song id
router.get('/:id', (req, res) => {
	Song.findById(req.params.id)
		.then((song) => res.json(song))
		.catch((err) =>
			res
				.status(404)
				.json({ nosongFound: 'No song found with that ID' })
		);
});

// delete song(won't delete song, only remove from playlist)
// needs...
// in body: playlistId
// in params: song id
router.delete('/:id', (req, res) => {
	Song.findById(req.params.id).then((song) => {

        Playlist.findById(song.playlistId).then((playlist) => {
            playlist.songs.forEach(com => {
                if (com.id.toString() === song._id.toString()) {
                    const indx = playlist.songs.indexOf(com);
                    playlist.songs.splice(indx, 1);
                    playlist.save();
                }
            })
        })
		.then(() => res.json({ success: 'song removed from playlist' }))
		.catch((err) =>
			res.status(500).json({ couldNotDelete: 'could not remove song from playlist' })
		);
	})
});


module.exports = router;
