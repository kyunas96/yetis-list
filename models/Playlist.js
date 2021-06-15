const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	songs: {
		type: Array,
		required: false,
	},
	comments: {
		type: Array,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Playlist = mongoose.model('Playlist', PlaylistSchema);
