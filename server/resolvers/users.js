require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');


const User = require('../models/User');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');

const access = process.env.ACCESS_TOKEN_SECRET;


function generateToken(user) {
	return jwt.sign({
		id: user.id,
		email: user.email,
		username: user.username

	}, access, { expiresIn: '1h' });
}

module.exports = {
	Mutation: {

		async login(_, { username, password }) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			const user = await User.findOne({ username });

			if (!user) {
				errors.general = `${username} not found`;
				throw new UserInputError(`${username} not found`, { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = 'Wrong credentials';
				throw new UserInputError('Wrong credentials', { errors });
			}

			//If success generate a new token for the user
			const token = generateToken(user);
			return {
				...user._doc,
				id: user._id,
				token

			};
		},
		async register(_,
			{
				registerInput: { username, email, password, confirmPassword }
			}
		) {
			//Validate user data
			const { valid, errors } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}

			//Throw an predefined error if user already exists
			const user = await User.findOne({ username });

			if (user) {
				throw new UserInputError('Username is taken', {
					errors: {
						username: `The user name "${username}" is taken`
					}
				});
			}

			//Hash password and create an auth token
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString()

			});
			const res = await newUser.save();

			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token

			};

		}

	}

};
