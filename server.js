const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./server/typeDefs');
const resolvers = require('./server/resolvers');
const { MONGODB, PORT } = require('./server/config');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(
		() => {
			console.log('Mongo has conneced');
			return server.listen(PORT);
		}
	);
