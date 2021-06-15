const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePlaylistInput(data) {
	let errors = {};

	data.title = validText(data.title) ? data.title : '';
	data.description = validText(data.description) ? data.description : '';

	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title field is required';
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0,
	};
};
