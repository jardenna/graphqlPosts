require('dotenv').config();
const SECRET = process.env.API_KEY;
const PROJECT_NAME = process.env.PROJECT_NAME;

module.exports = {
	MONGODB: `mongodb+srv://helle:${SECRET}@cluster0-pimzw.mongodb.net/${PROJECT_NAME}?retryWrites=true&w=majority` || 'mongodb://localhost/${PROJECT_NAME}',
	PORT: process.env.PORT || 5000
};


