const { AuthenticationError } = require('apollo-server');

const Post = require('../models/Post');
const checkAuth = require('../utils/checkAuth');

module.exports ={
	Query:{
		async getPosts(){
			try{
				const posts = await Post.find().sort({ createdAt: -1 });
				return posts;
			} catch(err){
				throw new Error(err);
			}
		},

		async getPost(_, { postId }){
			try {
				const post = await Post.findById(postId);

				if (post) {
					return post;
				} else{
					throw new Error(`The post with id ${postId} wasn't found`);
				}
			} catch (err) {
				throw new Error(err);

			}
		}
	},
	Mutation:{
		async createPost(_, {body}, context){
			const user = checkAuth(context);
			if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

			const post = await newPost.save();
			return post;
		},
		async deletePost(_,{postId}, context){
			const user = checkAuth(context);
			//Check if the user has permition to delete a post.

			try {
				const post = await Post.findById(postId);

				if (user.username === post.username) {
					await post.delete();
					return 'Post was deleted successfully';
				} else {
					throw new AuthenticationError(`${user.username} does not have permition to delete this post`);
				}

			} catch (err) {
				throw new Error(err);
			}

		}
	}
};
