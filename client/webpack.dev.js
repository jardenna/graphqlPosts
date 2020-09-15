const path = require('path');
const common = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
	mode: 'development',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'

	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
		port: 4000,
		historyApiFallback: true
	},
	devtool: 'source-map'
});
