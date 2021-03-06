const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
		type: String,
		required: true,
	},
    userId: {
        type: String,
		required: true,
    },
	username: {
        type: String,
		required: true,
	},
	playlistId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);