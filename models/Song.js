const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    audioFeatures: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
		required: true,
    },
	playlistId: {
		type: String,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Song = mongoose.model('Song', SongSchema);