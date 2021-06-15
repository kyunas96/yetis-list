const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			username: req.user.username,
			email: req.user.email,
		});
	}
);

// needs...
// in body: nothing
// in params: users id
router.get('/:id', (req, res) => {
	User.findOne({ _id: req.params.id }).then((user) => {
		res.json(user);
	});
});


// needs...
// in body: email, username, password
// in params: nothing
router.post('/signup', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res
				.status(400)
				.json({ email: 'A user has already registered with this address' });
		} else if (!req.body.email.includes('@') || !req.body.email.includes('.')) {
			return res.status(400).json({ email: 'Invalid Email' });
		} else {
			const newUser = new User({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			});

			// collection
			// 	.insertOne(newUser)
			// 	.then((res) => console.log(`successfuly added ${res}!`));

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

// needs...
// in body: email, password
// in params: nothing
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(404).json({ email: 'This user does not exist' });
		}

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				const payload = { id: user.id, username: user.username };

				jwt.sign(
					payload,
					keys.secretOrKey,
					// Tell the key to expire in one hour
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token,
						});
					}
				);
			} else {
				return res.status(400).json({ password: 'Incorrect password' });
			}
		});
	});
});

module.exports = router;
