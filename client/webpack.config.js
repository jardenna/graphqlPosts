const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
module.exports = {
	entry: {
		app: './src/js/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: './'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s[ac]ss$/i, //test scss
				use: [
					{
						loader: miniCssExtractPlugin.loader,
						options: {
							sourceMap: true,
							hmr: true,
							reloadAll: true

						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}

				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'ejs-loader',
						options: {
							variable: 'data',
							interpolate: '\\{\\{(.+?)\\}\\}',
							evaluate: '\\[\\[(.+?)\\]\\]'
						}
					},
					{
						loader: 'extract-loader'
					},

					{
						loader: 'html-loader'

					}

				]
			},
			{
				test: /\.(png|jpe?g|gif |svg)$/i,
				loader: 'file-loader',
				options: {
					name: '[name]-[hash].[ext]',
					outputPath: 'images'
				}
			}

		]
	},

	plugins: [

		new HtmlWebpackPlugin({
			title: 'Home',
			filename: 'index.html',
			template: './templates/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new miniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		})
	]
};
