const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	let username = validText(data.username) ? data.username : '';
	let email = validText(data.email) ? data.email : '';
	let password = validText(data.password) ? data.password : '';

	if (!Validator.isLength(username, { min: 2, max: 30 })) {
		errors.username = 'Username must be between 2 and 30 characters';
	}

	if (Validator.isEmpty(username)) {
		errors.username = 'Username field is required';
	}

	if (Validator.isEmpty(email)) {
		errors.email = 'Email field is required';
	}

	if (!email.includes('@') || !email.includes('.')) {
		errors.email = 'Invalid Email Format';
	}

	if (!Validator.isEmail(email)) {
		errors.email = 'Email is invalid';
	}

	if (Validator.isEmpty(password)) {
		errors.password = 'Password field is required';
	}

	if (!Validator.isLength(password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0,
	};
};

