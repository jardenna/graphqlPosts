const path = require('path');
const common = require('./webpack.config');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js'

	},
	plugins: [
		new CleanWebpackPlugin()
	]
});
